import { io } from "socket.io-client";
import config from "~/common/constants/index";

class NotificationService {
  constructor(auth, onGetComplete, onPush, onReadSuccess) {
    this.auth = auth;
    this.connect();
    this.notifications = [];
    this.onGetComplete = onGetComplete;
    this.onPush = onPush;
    this.onReadSuccess = onReadSuccess;
  }

  connect() {
    if (this.auth.isLoggedIn) {
      this.socket = io(config.SOCKET_URL);
      this.socket.emit("hello", { uid: this.auth.user.id });

      this.socket.on("get", (response) => {
        this.notifications = response.data;
        this.onGetComplete(this.notifications);
      });

      this.socket.on("push", (response) => {
        this.notifications = [response, ...this.notifications];
        this.onPush(this.notifications);
      });
    }
  }

  getNotifications() {
    if (!this.auth.isLoggedIn) return;

    this.socket.emit("get", {
      item: "notification",
      as: this.auth.user.id,
    });
  }

  read(conversation_id, message_id) {
    this.socket.emit("read", {
      conversation_id,
      message_id,
    });
    this.notifications.find((n) => n.id === message_id).seen = true;
    this.onReadSuccess([...this.notifications]);
  }
}

export default NotificationService;
