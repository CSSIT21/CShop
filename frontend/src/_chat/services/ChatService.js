import { io } from 'socket.io-client'
import { nanoid } from 'nanoid'
import config from '~/common/constants/index'

class ChatService {
    _uid = -1
    _isCustomer = null
    _users = null

    constructor(user, onGetComplete, onReceive) {
        // console.log('init')
        this._uid = user.id
        this._isCustomer = user.role === 'CUSTOMER'
        this.socket = io(config.SOCKET_URL)
        this.onGetComplete = onGetComplete
        this.onReceive = onReceive
        this.init()
    }

    init() {
        if(!sessionStorage.getItem('temp'))
        {
            sessionStorage.setItem('temp', '{}')
        }
        this.socket.on('get', (response) => {
            this.handleGet(response)
        })

        this.socket.on('status', (response) => {
            let messages = JSON.parse(sessionStorage.getItem('messages'))
            let conv = messages.find((m) => m.id === response.conversation_id)
            if (response.peer === 'shop' && this._isCustomer) {
                conv.active = (response.event === 'join') ? true : false
            }
            sessionStorage.setItem('messages', JSON.stringify(messages))
        })

        this.socket.on('send', (response) => {
            // console.log('send')
            let messages = JSON.parse(sessionStorage.getItem('messages'))
            let index = messages.findIndex((m) => m.id === response.conversation_id)
            let conversation = messages[index]
            if(!conversation.messages.find(m => m.id === response.id))
            {
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
                if(conversation.messages.length > 0)
                {
                    conversation.messages.push(response)
                }
                else
                {
                    // ?
                }
                
                conversation.content_type = response.content_type
                conversation.latest_text = response.content_type === 'Text' ? response.content : ''
                conversation.latest_id = response.id
                if(this._isCustomer && !response.from_customer) conversation.seen = false
                messages.unshift(messages.splice(index, 1)[0])
                sessionStorage.setItem('messages', JSON.stringify(messages))
                // console.log(this._temp, response.temp_id)
                
                this.onReceive(response)
            }
        })

        this.socket.on('read', (response) => {
            let messages = JSON.parse(sessionStorage.getItem('messages'))
            let conversation = messages.find(m => m.id === response.conversation_id)
            console.log(conversation)
            let message = conversation.messages.find(m => m.id === response.message_id)
            message.seen = true
            console.log('read ', message.id, message.seen)
            if(message.id === conversation.latest_id) conversation.seen = true
            sessionStorage.setItem('messages', JSON.stringify(messages))
        })

        // if (!sessionStorage.getItem('messages')) {
        //     this.socket.emit('get', {
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

        this.socket.emit('get', {
            item: sessionStorage.getItem('messages') ? 'latestMessageId' : 'conversation',
            as: this._uid
        })
        sessionStorage.setItem('isGetting', 'true')
    }

    handleGet(response) {
        let messages = []
        switch(response.item)
        {
            case 'conversation':
                for(const conv of response.data)
                {
                    // console.log('joining ' + conv.id)
                    this.socket.emit('join', {
                        conversation_id: conv.id,
                        from_customer: this._isCustomer
                    })
                    messages.push({ ...conv, messages: [], active: false })
                }
                // console.log('get', messages)
                sessionStorage.setItem('messages', JSON.stringify(messages))
                this.onGetComplete()
                break;

            case 'message':
                // console.log('got message')
                messages = JSON.parse(sessionStorage.getItem('messages'))
                messages.find(m => m.id === response.data.conversation_id).messages = response.data.messages
                sessionStorage.setItem('messages', JSON.stringify(messages))
                this.onGetConversationComplete()
                break;

            case 'latestMessageId':
                messages = JSON.parse(sessionStorage.getItem('messages'))
                if((messages.length === 0 && response.data.id !== 0) || (messages.length > 0 && messages[0].latest_id !== response.data.id))
                {
                    this.socket.emit('get', {
                        item: 'conversation',
                        as: this._uid
                    })
                    return sessionStorage.setItem('isGetting', 'true')
                }
                else if(messages.length > 0)
                {
                    for(const conv of messages)
                    {
                        conv.active = false
                        this.socket.emit('join', {
                            conversation_id: conv.id,
                            from_customer: this._isCustomer
                        })
                    }
                }
                sessionStorage.setItem('messages', JSON.stringify(messages))
                break;
        }

        sessionStorage.setItem('isGetting', 'false')
    }

    get messages() {
        return JSON.parse(sessionStorage.getItem('messages')) || []
    }

    get users() {
        return this._users
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
        return messages ? JSON.parse(messages).find(m => m.id === conversation_id) : undefined
    }

    getConversation(conversation_id, callback) {
        console.log('get', conversation_id)
        this.socket.emit('get', {
            item: 'message',
            with: {
                conversation_id: conversation_id
            }
        })
        sessionStorage.setItem('isGetting', 'true')
        this.onGetConversationComplete = callback
    }

    sendText(text, conversation_id) {
        const temp_id = nanoid()
        const message = {
            temp_id: temp_id,
            conversation_id: conversation_id,
            content_type: 'Text',
            content: text,
            from_customer: this._isCustomer
        }
        console.log(
            `%c ChatService.js %c '${text}' sent to conv #${conversation_id}`,
            'color:white;background:green',
            ''
        )
        this.socket.emit('send', message)
        let messages = JSON.parse(sessionStorage.getItem('messages'))
        let conversation = messages.find((m) => m.id === conversation_id)
        conversation.messages.push({
            ...message,
            temp_id: temp_id,
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

    sendImage(image, recipient) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                this._messages.push({
                    message_id:
                        this._messages[this._messages.length - 1].message_id + 1,
                    message_datetime: new Date()
                        .toISOString()
                        .replace('T', ' ')
                        .replace('Z', ''),
                    sender: this._uid,
                    recipient: recipient,
                    seen: false,
                    content_type: 'Image',
                    content: event.target.result,
                    content_extra: null
                })
                console.log(
                    `%c ChatService.js %c '${image.name}' sent to user #${recipient}`,
                    'color:white;background:green',
                    ''
                )
                resolve()
            })
            reader.readAsDataURL(image)
        })
    }

    sendVideo(video, recipient) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                document.write(
                    '<video src="' +
                        event.target.result +
                        '" width="320" height="240" controls></video>'
                )
                // this._messages.push({
                //     message_id: this._messages[this._messages.length - 1] + 1,
                //     message_datetime: new Date()
                //         .toISOString()
                //         .replace('T', ' ')
                //         .replace('Z', ''),
                //     sender: this._uid,
                //     recipient: recipient,
                //     seen: false,
                //     content_type: 'Image',
                //     content: event.target.result,
                //     content_extra: null
                // })
                // console.log(
                //     `%c ChatService.js %c '${image.name}' sent to user #${recipient}`,
                //     'color:white;background:green',
                //     ''
                // )
                resolve()
            })
            reader.readAsDataURL(video)
        })
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
        if(this._isCustomer ^ this.conversation(conversation_id).messages.find(m => m.id === message_id).from_customer)
        {
            this.socket.emit('read', {
                conversation_id: conversation_id,
                message_id: message_id
            })
        }
    }
}

export default ChatService
