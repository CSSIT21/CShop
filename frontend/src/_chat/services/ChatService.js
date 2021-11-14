import messages from './dummy/messages.json'
import users from './dummy/users.json'
import self from './dummy/self.json'

class ChatService {
    _uid = -1

    constructor(user_id) {
        this._uid = user_id
    }

    get messages() {
        return messages

        /***
         * 
         * FYI, this is equivalent to:
         * 
         * SELECT *
         * FROM (
         *         SELECT message.message_id,
         *                 message_datetime,
         *                 sender,
         *                 recipient,
         *                 seen,
         *                 content_type,
         *                 video_url       AS content,
         *                 video_thumbnail AS content_extra
         *         FROM message
         *                 JOIN chat_video ON message.message_id = chat_video.message_id
         *                 JOIN video ON chat_video.video_id = video.video_id
         *         UNION
         *         SELECT message.message_id,
         *                 message_datetime,
         *                 sender,
         *                 recipient,
         *                 seen,
         *                 content_type,
         *                 chat_text.text AS content,
         *                 NULL
         *         FROM message
         *                 JOIN chat_text ON message.message_id = chat_text.message_id
         *         UNION
         *         SELECT message.message_id,
         *                 message_datetime,
         *                 sender,
         *                 recipient,
         *                 seen,
         *                 content_type,
         *                 image_url,
         *                 NULL
         *         FROM message
         *                 JOIN chat_image ON message.message_id = chat_image.message_id
         *                 JOIN image ON chat_image.image_id = image.image_id
         *         UNION
         *         SELECT message.message_id,
         *                 message_datetime,
         *                 sender,
         *                 recipient,
         *                 seen,
         *                 content_type,
         *                 notification.text,
         *                 decode(notification.action_url, 'escape')
         *         FROM message
         *                 JOIN notification ON message.message_id = notification.message_id
         *     ) AS U
         * WHERE U.sender = _uid OR U.recipient = _uid
         * ORDER BY U.message_datetime;
         * 
         */
    }

    get latestMessages() {
        let keys = []
        let latest = []
        messages.forEach(m => {
            let uid = m.sender === this._uid ? m.recipient : m.sender
            let i = keys.findIndex(k => k === uid)
            if(i === -1)
            {
                latest.push(JSON.parse(JSON.stringify(m)))
                keys.push(uid)
            }
            else
            {
                latest[i] = JSON.parse(JSON.stringify(m))
            }
        })
        return latest.reverse()
    }

    messagesBetween(user_id) {
        return messages.filter(m => m.sender === user_id || m.recipient === user_id)
    }

    latestMessageBetween(user_id) {
        const messagesBetweenReverse = [...this.messagesBetween(user_id)].reverse()
        return messagesBetweenReverse[0] || {}
    }

    get users() {
        return users

        /***
         * 
         * FYI, this is equivalent to
         * 
         * SELECT user_info.user_id, user_info.email, user_info.pic, user_detail.displayname, user_detail.shop_url
         * FROM user_info
         *          JOIN (
         *     SELECT user_id, TRIM(CONCAT(firstname, ' ', lastname)) AS displayname, NULL AS shop_url
         *     FROM customer
         *     UNION
         *     SELECT *
         *     FROM vendor
         *     UNION
         *     SELECT *, NULL
         *     FROM administrator
         * ) AS user_detail ON user_info.user_id = user_detail.user_id
         * WHERE EXISTS(
         *     SELECT message_id
         *     FROM message
         *     WHERE (sender = user_info.user_id AND recipient = _uid) OR (sender = _uid AND recipient = user_info.user_id)
         * )
         * ORDER BY user_id;
         * 
         */
    }

    userWithId(user_id) {
        // console.log(users)
        return users.find(u => u.user_id === user_id)
    }

    get self() {
        return self
        /***
         * 
         * FYI, this is equivalent to
         * 
         * SELECT user_info.user_id, email, pic, TRIM(CONCAT(firstname, ' ', lastname)) AS displayname
         * FROM user_info JOIN customer ON user_info.user_id = customer.user_id
         * WHERE user_info.user_id = _uid;
         * 
         */
    }
}

export default ChatService;