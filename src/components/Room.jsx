import React, { useLayoutEffect, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { get } from '../utils';
import ChatForm from './ChatForm';
import ImageSelector from './ImageSelector';
import ImageChat from './ImageChat';

const Container = styled.div`
  z-index: 10;
  position: relative;
  overflow-y: auto;
  height: 610px;
  padding-bottom: 50px;
  background-color: var(--color-pale-grey);

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ChatList = styled.ul`
  padding-top: 5px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Chat = styled.li`
  width: 100%;
  margin-bottom: 5px;
  font-size: 12px;
  padding: 0 12px;
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => props.location};
`;
const Me = styled.div`
  max-width: 200px;
  max-height: 200px;
  overflow: auto;
  word-break: break-all;

  background-color: var(--color-purple);
  color: var(--color-white);
  line-height: 18px;
  padding: 10px;
  border-radius: 15px;

  white-space: wrap;

  -webkit-box-shadow: 3px 3px 5px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 3px 3px 5px 0px rgba(199, 199, 199, 1);
  box-shadow: 3px 3px 5px 0px rgba(199, 199, 199, 1);
`;
const You = styled.div`
  padding: 10px;
  background-color: var(--color-white);
  line-height: 18px;
  border-radius: 15px;

  -webkit-box-shadow: 3px 3px 5px 0px rgba(199, 199, 199, 1);
  -moz-box-shadow: 3px 3px 5px 0px rgba(199, 199, 199, 1);
  box-shadow: 3px 3px 5px 0px rgba(199, 199, 199, 1);
`;

const Time = styled.span`
  margin: 0 4px;
  color: var(--color-cool-grey);
  &::after {
    content: "${(props) => props.time}";
  }
  display:${(props) => props.show === false && 'none'};
`;

const Divider = styled.div`
  position: relative;
  margin: 28px 0;
  height: 2px;

  background-color: var(--color-cool-grey);
  &::after {
    content: "${(props) => props.time}";
    z-index:1;
    font-size:12px;
    position:absolute;
    background-color: var(--color-pale-grey);
    padding:10px;
    left:50%;
    transform:translate(-50%, -50%);
    color: var(--color-cool-grey);
  }
`;

function dateToKr(date) {
  const d = date.split('/');
  return `${d[2]}년 ${d[0]}월 ${d[1]}일`;
}
function isToday(date) {
  const today = new Date();
  const d = date.split('/');
  const ymd = d[2] + d[0] + d[1];
  const now =
    today.getFullYear() +
    ('00' + (today.getMonth() + 1)).slice(-2) +
    ('00' + today.getDate()).slice(-2);
  return now !== ymd;
}

export default function Room({
  room,
  input,
  onChange,
  onSubmit,
  onSelectImage,
}) {
  const scrollRef = useRef();
  const title = useSelector(get('title'));
  const images = useSelector(get('images'));
  const showImageSelector = useSelector(get('showImageSelector'));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 100000);
    }
  }, [room]);

  return (
    <Container ref={scrollRef}>
      <ImageSelector
        images={images}
        onSelectImage={onSelectImage}
        showImageSelector={showImageSelector}
      />
      <ChatList>
        {room.chats &&
          room.chats.map((chat) => {
            return (
              <li key={chat.ymd}>
                <ul>
                  {chat.chats &&
                    chat.chats.map((talk, index) => {
                      return talk.author === title ? (
                        <Chat key={talk.time + index} location={'flex-start'}>
                          <You>{talk.content}</You>
                          <Time time={talk.time.slice(11, 16)} />
                        </Chat>
                      ) : (
                        <Chat key={talk.time + index} location={'flex-end'}>
                          <Time
                            time={talk.time.slice(11, 16)}
                            show={talk.show}
                          />
                          {talk.type === 'img' ? (
                            <ImageChat img={talk.content} />
                          ) : (
                            <Me>{talk.content}</Me>
                          )}
                        </Chat>
                      );
                    })}

                  {isToday(chat.ymd) && (
                    <li key={new Date()} style={{ zIndex: -1 }}>
                      <Divider time={dateToKr(chat.ymd)} />
                    </li>
                  )}
                </ul>
              </li>
            );
          })}
      </ChatList>
      <ChatForm
        roomId={room.id}
        value={input}
        onChange={onChange}
        name={'chatInput'}
        onSubmit={onSubmit}
      />
    </Container>
  );
}
