import IconWrapper from "../../shared/icon-wrapper";
import React from "react";

/*
How to use this component:
{
  id: "1234567",
  tag: "div",
  className: "flex flex-row w-full justify-end gap-2",
  componentName: "BlockSocial",
  props: {
    items: [
      {
        id: "1",
        name: "Facebook",
        icon: "Facebook",
        type: "a",
        className:
          "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-blue-600 text-white",
        props: {
          href: "https://facebook.com",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
      {
        id: "2",
        name: "Twitter",
        icon: "Twitter",
        type: "a",
        className:
          "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-blue-400 text-white",
        props: {
          href: "https://twitter.com",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
      {
        id: "3",
        name: "Youtube",
        icon: "Youtube",
        type: "a",
        className:
          "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-red-600 text-white",
        props: {
          href: "https://youtube.com",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
      {
        id: "4",
        name: "Instagram",
        icon: "Instagram",
        type: "a",
        className:
          "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white",
        props: {
          href: "https://instagram.com",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    ],
  },
},
*/

interface SocialItemProps {
  id: string;
  name: string;
  icon: string;
  type: string;
  className?: string;
  props: {
    href: string;
    target: string;
    rel: string;
    children?: React.ReactNode;
  };
}

interface BlockSocialProps {
  items: SocialItemProps[];
  iconLibrary?: Record<string, string>;
}

const BlockSocial: React.FC<BlockSocialProps> = ({ items }) => {
  return (
    <>
      {items.map((item: SocialItemProps) => {
        const Tag = item.type as keyof JSX.IntrinsicElements;

        return (
          <Tag key={item.id} className={item.className} {...item.props}>
            <IconWrapper iconName={item.icon} size={16} />
            {item.props.children}
          </Tag>
        );
      })}
    </>
  );
};

export default BlockSocial;
