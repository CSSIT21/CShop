import { io } from 'socket.io-client'
import { nanoid } from 'nanoid'
import config from '~/common/constants/index'
import { getUrl } from '~/common/utils'

function getVideoCover(file, seekTo = 0.0) {
    console.log("getting video cover for file: ", file);
    return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            reject("error when loading video file", ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < seekTo) {
                reject("video is too short.");
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
                videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                console.log('video is now paused at %ss.', seekTo);
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                ctx.canvas.toBlob(
                    blob => {
                        resolve(blob);
                    },
                    "image/jpeg",
                    0.1 /* quality */
                );
            });
        });
    });
}

class ChatService {
    _uid = -1
    _isCustomer = null
    _users = null
    static socket

    constructor(user, onGetComplete, onGetShopComplete, onReceive) {
        // console.log('init')
        this._uid = user.id
        this._isCustomer = user.role === 'CUSTOMER'
        ChatService.socket = io(config.SOCKET_URL)
        this.onGetComplete = onGetComplete
        this.onGetShopComplete = onGetShopComplete
        this.onReceive = onReceive
        this._isCustomerView = true
        this.init()
    }

    init() {
        if (!sessionStorage.getItem('temp')) {
            sessionStorage.setItem('temp', '{}')
        }
        ChatService.socket.on('get', (response) => {
            this.handleGet(response)
        })

        ChatService.socket.on('status', (response) => {
            let messages = JSON.parse(sessionStorage.getItem('messages'))
            let conv = messages.find((m) => m.id === response.conversation_id)
            if (
                (response.peer === 'shop' && conv.customer_id === this._uid) ||
                (response.peer === 'customer' && conv.customer_id !== this._uid)
            ) {
                conv.active = response.event === 'join' ? true : false
            }
            sessionStorage.setItem('messages', JSON.stringify(messages))
        })

        ChatService.socket.on('send', (response) => {
            // console.log('send')
            let messages = JSON.parse(sessionStorage.getItem('messages'))
            let index = messages.findIndex(
                (m) => m.id === response.conversation_id
            )
            let conversation = messages[index]
            if (!conversation.messages.find((m) => m.id === response.id)) {
                let temp = JSON.parse(sessionStorage.getItem('temp'))
                if (temp[response.temp_id]) {
                    console.log(
                        'removing dummy ' +
                            response.temp_id +
                            ' ' +
                            temp[response.temp_id]
                    )
                    conversation.messages.splice(temp[response.temp_id], 1)
                    delete temp[response.temp_id]
                    sessionStorage.setItem('temp', JSON.stringify(temp))
                }
                if (conversation.messages.length > 0) {
                    conversation.messages.push(response)
                } else {
                    // ?
                }

                conversation.content_type = response.content_type
                conversation.latest_text =
                    response.content_type === 'Text' ? response.content : ''
                conversation.latest_id = response.id
                if (conversation.customer_id === this._uid && !response.from_customer)
                    conversation.seen = false
                messages.unshift(messages.splice(index, 1)[0])
                sessionStorage.setItem('messages', JSON.stringify(messages))
                // console.log(this._temp, response.temp_id)

                this.onReceive(response)
            }
        })

        ChatService.socket.on('read', (response) => {
            let messages = JSON.parse(sessionStorage.getItem('messages'))
            let conversation = messages.find(
                (m) => m.id === response.conversation_id
            )
            console.log(conversation)
            let message = conversation.messages.find(
                (m) => m.id === response.message_id
            )
            message.seen = true
            console.log('read ', message.id, message.seen)
            if (message.id === conversation.latest_id) conversation.seen = true
            sessionStorage.setItem('messages', JSON.stringify(messages))
        })

        // if (!sessionStorage.getItem('messages')) {
        //     ChatService.socket.emit('get', {
        //         item: 'conversation',
        //         as: this._uid
        //     })
        //     sessionStorage.setItem('isGetting', 'true')
        // } else {
        //     this.socket.emit('get', {
        //         item: 'latestMessageId',
        //         as: this._uid
        //     })
        //     sessionStorage.setItem('isGetting', 'true')
        // }

        ChatService.socket.emit('get', {
            item: sessionStorage.getItem('messages')
                ? 'latestMessageId'
                : 'conversation',
            as: this._uid
        })
        if(!this._isCustomer)
        {
            ChatService.socket.emit('get', {
                item: 'shop',
                as: this._uid
            })
        }
        sessionStorage.setItem('isGetting', 'true')
    }

    handleGet(response) {
        let messages = []
        switch (response.item) {
            case 'conversation':
                for (const conv of response.data) {
                    // console.log('joining ' + conv.id)
                    ChatService.socket.emit('join', {
                        conversation_id: conv.id,
                        from_customer: conv.customer_id === this._uid
                    })
                    messages.push({ ...conv, messages: [], active: false })
                }
                // console.log('get', messages)
                sessionStorage.setItem('messages', JSON.stringify(messages))
                this.onGetComplete()
                break

            case 'conversationId':
                console.log('sohuld get conv id ' + response.data)
                this.onGetConversationIdComplete(response.data)
                break

            case 'message':
                // console.log('got message')
                messages = JSON.parse(sessionStorage.getItem('messages'))
                messages.find(
                    (m) => m.id === response.data.conversation_id
                ).messages = response.data.messages
                sessionStorage.setItem('messages', JSON.stringify(messages))
                this.onGetConversationComplete()
                break

            case 'latestMessageId':
                messages = JSON.parse(sessionStorage.getItem('messages'))
                if (
                    (messages.length === 0 && response.data.id !== 0) ||
                    (messages.length > 0 &&
                        messages[0].latest_id !== response.data.id)
                ) {
                    ChatService.socket.emit('get', {
                        item: 'conversation',
                        as: this._uid
                    })
                    return sessionStorage.setItem('isGetting', 'true')
                } else if (messages.length > 0) {
                    for (const conv of messages) {
                        conv.active = false
                        ChatService.socket.emit('join', {
                            conversation_id: conv.id,
                            from_customer: conv.customer_id === this._uid
                        })
                    }
                }
                sessionStorage.setItem('messages', JSON.stringify(messages))
                break

            case 'shop':
                sessionStorage.setItem('shop', JSON.stringify({
                    name: response.data[0].shop_name,
                    pic: response.data[0].shop_pic
                }))
                this.onGetShopComplete()
                break
        }

        sessionStorage.setItem('isGetting', 'false')
    }

    get messages() {
        return JSON.parse(sessionStorage.getItem('messages')) || []
    }

    get users() {
        return this._users
    }

    get shop() {
        return JSON.parse(sessionStorage.getItem('shop')) || {}
    }

    get isGetting() {
        return sessionStorage.getItem('isGetting') === 'true'
    }

    get latestMessageId() {
        return sessionStorage.getItem('latestMessageId') || 0
    }

    set latestMessageId(id) {
        sessionStorage.setItem('latestMessageId', id)
    }

    conversation(conversation_id) {
        const messages = sessionStorage.getItem('messages')
        return messages
            ? JSON.parse(messages).find((m) => m.id === conversation_id)
            : undefined
    }

    getConversation(conversation_id, callback) {
        console.log('get', conversation_id)
        ChatService.socket.emit('get', {
            item: 'message',
            with: {
                conversation_id: conversation_id
            }
        })
        sessionStorage.setItem('isGetting', 'true')
        this.onGetConversationComplete = callback
    }

    getConversationId(shop_id, callback) {
        // console.log('get', conversation_id)
        sessionStorage.setItem('isGetting', 'true')
        ChatService.socket.emit('get', {
            item: 'conversationId',
            as: this._uid,
            with: shop_id
        })
        this.onGetConversationIdComplete = (id) => {
            if(!this.conversation(id))
            {
                this.onGetComplete = (function (old) {
                    function extendsInit() {
                        old()
                        callback(id)
                    }

                    return extendsInit
                })(this.onGetComplete)

                ChatService.socket.emit('get', {
                    item: 'conversation',
                    as: this._uid
                })
                sessionStorage.setItem('isGetting', 'true')
            }
            else
            {
                callback(id)
            }
        }
    }

    sendText(text, conversation_id) {
        const temp_id = nanoid()
        let messages = JSON.parse(sessionStorage.getItem('messages'))
        let conversation = messages.find((m) => m.id === conversation_id)
        const message = {
            temp_id: temp_id,
            conversation_id: conversation_id,
            content_type: 'Text',
            content: text,
            from_customer: conversation.customer_id === this._uid
        }
        console.log(
            `%c ChatService.js %c '${text}' sent to conv #${conversation_id}`,
            'color:white;background:green',
            ''
        )
        ChatService.socket.emit('send', message)

        conversation.messages.push({
            ...message,
            message_time: '',
            seen: false,
            content_extra: null
        })
        sessionStorage.setItem('messages', JSON.stringify(messages))
        let temp = JSON.parse(sessionStorage.getItem('temp'))
        temp[temp_id] = conversation.messages.length - 1
        sessionStorage.setItem('temp', JSON.stringify(temp))
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    async sendImage(image, conversation_id) {
        const temp_id = nanoid()
        let messages = JSON.parse(sessionStorage.getItem('messages'))
        let conversation = messages.find((m) => m.id === conversation_id)
        const message = {
            temp_id: temp_id,
            conversation_id: conversation_id,
            content_type: 'Image',
            content: null,
            from_customer: conversation.customer_id === this._uid
        }
        
        conversation.messages.push({
            ...message,
            message_time: '',
            seen: false,
            content_extra: null
        })
        sessionStorage.setItem('messages', JSON.stringify(messages))
        let temp = JSON.parse(sessionStorage.getItem('temp'))
        temp[temp_id] = conversation.messages.length - 1
        sessionStorage.setItem('temp', JSON.stringify(temp))

        const url = await getUrl(image)
        if (!url.success) return
        message.content = url.original_link
        ChatService.socket.emit('send', message)

        console.log(
            `%c ChatService.js %c Image sent to conv #${conversation_id}`,
            'color:white;background:green',
            ''
        )
    }


    async sendVideo(video, conversation_id) {
        const temp_id = nanoid()
        let messages = JSON.parse(sessionStorage.getItem('messages'))
        let conversation = messages.find((m) => m.id === conversation_id)
        const message = {
            temp_id: temp_id,
            conversation_id: conversation_id,
            content_type: 'Video',
            content: null,
            from_customer: conversation.customer_id === this._uid
        }
        
        conversation.messages.push({
            ...message,
            message_time: '',
            seen: false,
            content_extra: null
        })
        sessionStorage.setItem('messages', JSON.stringify(messages))
        let temp = JSON.parse(sessionStorage.getItem('temp'))
        temp[temp_id] = conversation.messages.length - 1
        sessionStorage.setItem('temp', JSON.stringify(temp))
        
        const thumbnailBlob = await getVideoCover(video, 0)
        const thumbnail = await new Promise(async (resolve) => {
            resolve(await getUrl(thumbnailBlob))
            // let reader = new FileReader()
            // reader.readAsDataURL(thumbnailBlob)
            // reader.onload = async function () {
            //     const thumbnail64 = reader.result
            //     const thumbnail_url = await getUrl(thumbnailBlob)
            //     resolve(thumbnail_url)
            // }
        })

        const url = await getUrl(video)
        if (!url.success) return
        message.content = url.original_link
        message.content_extra = thumbnail.original_link
        ChatService.socket.emit('send', message)

        console.log(
            `%c ChatService.js %c Video sent to conv #${conversation_id}`,
            'color:white;background:green',
            ''
        )
    }

    send(contentType, content, conversation_id) {
        if (contentType === 'text') {
            return this.sendText(content, conversation_id)
        } else if (contentType === 'image') {
            return this.sendImage(content, conversation_id)
        } else if (contentType === 'video') {
            return this.sendVideo(content, conversation_id)
        }
    }

    read(conversation_id, message_id) {
        ChatService.socket.emit('read', {
            conversation_id: conversation_id,
            message_id: message_id
        })
    }

    static disconnect() {
        ChatService.socket?.disconnect()
        sessionStorage.removeItem('temp')
        sessionStorage.removeItem('messages')
        sessionStorage.removeItem('isGetting')
        sessionStorage.removeItem('shop')
    }
}

export default ChatService
