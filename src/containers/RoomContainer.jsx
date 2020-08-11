import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from '../utils';
import { setInput, sendNewChat, selectImg } from '../modules/reducer/actions';
import Room from '../components/Room';

function leftOnlyLastTime(room) {
  if (!room.chats) {
    return;
  }
  const myChats = [...room.chats];
  const temp = myChats.map((chatList) => {
    const chats = chatList.chats.map((chat, index) => {
      if (!chatList.chats[index + 1]) {
        return chat;
      }
      if (chat.author !== chatList.chats[index + 1].author) {
        return chat;
      }
      if (
        chat.time.slice(11, 16) === chatList.chats[index + 1].time.slice(11, 16)
      ) {
        chat.show = false;
        return chat;
      }
      return chat;
    });

    return {
      ...chatList,
      chats,
    };
  });
  return {
    ...room,
    chats: temp,
  };
}

export default function RoomContainer() {
  const dispatch = useDispatch();
  const room = useSelector(get('room'));

  const input = useSelector(get('chatInput'));

  function handleChange({ name, value }) {
    dispatch(setInput({ name, value }));
  }

  function handleSubmit(id) {
    dispatch(sendNewChat(id));
  }

  function handleSelectImg(id) {
    dispatch(selectImg(id));
  }

  leftOnlyLastTime(room);

  return (
    <Room
      room={room}
      input={input}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onSelectImage={handleSelectImg}
    />
  );
}
