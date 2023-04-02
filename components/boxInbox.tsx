import React, { useState } from "react";
import { chatList } from "@/utils/generateData";
import { ChatListType, ChatType } from "@/types/ChatType";
import moment from "moment";

type BoxInboxProps = {
  onClose: () => void;
};

const BoxInbox = (props: BoxInboxProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null
  );
  const [chatLists, setChatLists] = useState<ChatListType[]>(chatList);
  const [page, setPage] = useState<string>("list");
  const [detailChat, setDetailChat] = useState<ChatListType | undefined>();

  const handleClickChat = (id: number) => {
    setPage("chat");
    setDetailChat(chatLists.find((chat) => chat.id === id));
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textInput !== "") {
      const newChat: ChatType = {
        id: Math.floor(Math.random() * 1000),
        message: textInput,
        timestamp: new Date().toString(),
        sender: "Muhammad Naufal",
        senderId: 3,
        isYou: true,
      };
      const newDetailChat: ChatListType = {
        id: detailChat?.id ?? Math.floor(Math.random() * 1000),
        name: detailChat?.name ?? "",
        lastSender: newChat.sender,
        lastMessage: newChat.message,
        timestamp: newChat.timestamp,
        newNotification: true,
        participants: null,
        conversations: [...(detailChat?.conversations ?? []), newChat],
        avatar: <div></div>,
      };
      setDetailChat(newDetailChat);
      setTextInput("");
      // make scroll to very bottom of the chat
      const chatContainer = document.getElementById("chat-box");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  };

  // delete function detailChat handleDeleteDetailChat
  const handleDeleteDetailChat = (id: number) => {
    const newDetailChat = {
      id: detailChat?.id,
      name: detailChat?.name || "",
      conversations:
        detailChat?.conversations?.filter((chat) => chat.id !== id) ?? null,
      lastSender: detailChat?.lastSender,
      lastMessage: detailChat?.lastMessage || "",
      timestamp: detailChat?.timestamp || "",
      newNotification: detailChat?.newNotification || false,
      participants: detailChat?.participants || null,
      avatar: detailChat?.avatar || <div></div>,
    };
    setDetailChat(newDetailChat);
  };
  return (
    <div className="mb-5">
      <div className="w-[584px] h-[587px] overflow-y-auto px-8 py-6 bg-white rounded border border-[#BDBDBD]">
        {/* page list */}
        {page === "list" && (
          <div className="flex flex-col">
            {/* search */}
            <form>
              <div className="relative">
                <input
                  type="search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 bg-white border border-[#828282] rounded-lg"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none right-10">
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.21143 7.54717H8.75345L12.1771 10.9777L11.1548 12L7.72429 8.57633V8.03431L7.53905 7.8422C6.75688 8.51458 5.74145 8.91938 4.63682 8.91938C2.17369 8.91938 0.177124 6.92281 0.177124 4.45969C0.177124 1.99657 2.17369 0 4.63682 0C7.09994 0 9.09651 1.99657 9.09651 4.45969C9.09651 5.56432 8.6917 6.57976 8.01932 7.36192L8.21143 7.54717ZM1.54933 4.4597C1.54933 6.16811 2.92841 7.54718 4.63681 7.54718C6.34522 7.54718 7.72429 6.16811 7.72429 4.4597C7.72429 2.7513 6.34522 1.37222 4.63681 1.37222C2.92841 1.37222 1.54933 2.7513 1.54933 4.4597Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
              </div>
            </form>
            {/* chat list */}
            <div className="flex flex-col w-full">
              {chatLists
                .filter((chat) => {
                  if (searchInput === "") {
                    return chat;
                  } else if (
                    chat.name.toLowerCase().includes(searchInput.toLowerCase())
                  ) {
                    return chat;
                  }
                })
                .map((chat: ChatListType, index: number) => (
                  <div key={index}>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleClickChat(chat.id!)}>
                      <div className="flex w-full gap-4 py-5">
                        <div className="w-[51px] flex justify-center">
                          {chat.avatar}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex gap-4">
                            <div className="text-base font-bold text-[#2F80ED]">
                              {chat.name}
                            </div>
                            <div>
                              {moment(chat.timestamp).format(
                                "MMMM D,YYYY HH:MM"
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-[450px]">
                            <div>
                              {chat.lastSender && (
                                <div className="text-base font-semibold">
                                  {chat.lastSender}:
                                </div>
                              )}
                              <div className="text-base">
                                {chat.lastMessage}
                              </div>
                            </div>
                            {chat.newNotification && (
                              <div className="w-2 h-2 rounded-full bg-[#EB5757]"></div>
                            )}
                          </div>
                        </div>
                      </div>
                      {index !== chatLists.length - 1 && (
                        <div className="w-full h-[1px] bg-[#828282]"></div>
                      )}
                    </div>
                    {chatLists.length === 0 && (
                      <div className="text-base font-bold text-[#2F80ED]">
                        No Chat Found
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
        {/* page chat */}
        {page === "chat" && (
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="cursor-pointer" onClick={() => setPage("list")}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="text-base font-bold text-[#2F80ED]">
                    {detailChat?.name}
                  </div>
                  <div className="text-xs text-[#333333]">
                    {detailChat?.participants} Participants
                  </div>
                </div>
              </div>
              <div className="cursor-pointer" onClick={props.onClose}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </div>
            <div>
              <div
                id="chat-box"
                className="flex flex-col gap-2 overflow-y-auto h-[430px]">
                {detailChat?.conversations?.map(
                  (conversation: ChatType, index: number) => (
                    <div
                      className={`flex min-w-[510px] max-w-sm ${
                        conversation.isYou === true
                          ? "justify-end"
                          : "justify-start"
                      }`}
                      key={index}>
                      <div className="flex-flex-col">
                        <div
                          className={`flex font-medium ${
                            conversation.isYou === true
                              ? "justify-end text-[#9B51E0]"
                              : "justify-start text-[#E5A443]"
                          }`}>
                          {conversation.isYou === true
                            ? "You"
                            : conversation.sender}
                        </div>
                        <div
                          className={`flex gap-3 ${
                            conversation.isYou === true
                              ? "flex-row-reverse"
                              : "flex-row"
                          }`}>
                          <div
                            className={`flex px-3 py-2 rounded ${
                              conversation.isYou === true
                                ? "justify-end bg-[#EEDCFF]"
                                : "justify-start bg-[#FCEED3]"
                            }`}>
                            <div className="flex flex-col">
                              <div>{conversation.message}</div>
                              <div>
                                {moment(conversation.timestamp).format("hh:mm")}
                              </div>
                            </div>
                          </div>
                          {conversation.isYou === true && (
                            <div className="relative cursor-pointer">
                              <svg
                                onClick={() => {
                                  conversation.isYou === true &&
                                    setSelectedChatIndex(index);
                                  setShowMore((prevState) => !prevState);
                                }}
                                width="12"
                                height="4"
                                viewBox="0 0 12 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z"
                                  fill="#4F4F4F"
                                />
                              </svg>
                              {showMore && selectedChatIndex === index && (
                                <div className="absolute top-3 flex flex-col px-4 py-3 w-28 bg-white border rounded border-[#BDBDBD]">
                                  <p className="text-blue-500">Edit</p>
                                  <hr />
                                  <p
                                    onClick={() =>
                                      handleDeleteDetailChat(conversation.id!)
                                    }
                                    className="text-red-500">
                                    Delete
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                          {conversation.isYou === false && (
                            <div className="relative cursor-pointer">
                              <svg
                                width="12"
                                height="4"
                                viewBox="0 0 12 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M2.00008 0.666672C1.26675 0.666672 0.666748 1.26667 0.666748 2.00001C0.666748 2.73334 1.26675 3.33334 2.00008 3.33334C2.73341 3.33334 3.33341 2.73334 3.33341 2.00001C3.33341 1.26667 2.73341 0.666672 2.00008 0.666672ZM10.0001 0.666672C9.26675 0.666672 8.66675 1.26667 8.66675 2.00001C8.66675 2.73334 9.26675 3.33334 10.0001 3.33334C10.7334 3.33334 11.3334 2.73334 11.3334 2.00001C11.3334 1.26667 10.7334 0.666672 10.0001 0.666672ZM4.66675 2.00001C4.66675 1.26667 5.26675 0.666672 6.00008 0.666672C6.73341 0.666672 7.33341 1.26667 7.33341 2.00001C7.33341 2.73334 6.73341 3.33334 6.00008 3.33334C5.26675 3.33334 4.66675 2.73334 4.66675 2.00001Z"
                                  fill="#4F4F4F"
                                />
                              </svg>
                              {showMore && selectedChatIndex === index && (
                                <div className="absolute top-3 flex flex-col px-4 py-3 w-28 bg-white border rounded border-[#BDBDBD]">
                                  <p className="text-blue-500">Edit</p>
                                  <hr />
                                  <p className="text-red-500">Delete</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="fixed w-full bottom-32">
              <div className="flex items-center w-full gap-3">
                <form onSubmit={handleSubmitMessage} className="w-[440px]">
                  <div className="relative">
                    <input
                      className="block w-full p-2 text-sm text-gray-900 bg-white border border-[#828282] rounded-lg"
                      placeholder="Type a new message"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    />
                  </div>
                </form>
                <button
                  onClick={() => handleSubmitMessage}
                  className="px-4 py-2 bg-[#2F80ED] rounded text-white font-medium">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxInbox;
