import firebase from 'firebase/compat/app';

export interface Chat {
  id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: firebase.firestore.Timestamp;
  sender : any
  receiver:any
}
