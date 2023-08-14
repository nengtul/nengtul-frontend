// import React, { useRef } from 'react';

// const WebSocketContext = React.createContext<any>(null);
// export { WebSocketContext };

// export default ({ children }: { children: React.ReactNode }) => {
//   const webSocketUrl = `ws://nengtul.shop/chat`
//   let ws = useRef<WebSocket | null>(null);
//   console.log('여기까진??')
//   if (!ws.current) {
//     ws.current = new WebSocket(webSocketUrl);
//     ws.current.onopen = () => {
//       console.log("connected to " + webSocketUrl);
//     }
//     ws.current.onclose = error => {
//       console.log("disconnect from " + webSocketUrl);
//       console.log(error);
//     };
//     ws.current.onerror = error => {
//       console.log("connection error " + webSocketUrl);
//       console.log(error);
//     };
//   }

//   return (
//     <WebSocketContext.Provider value={ws}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// }