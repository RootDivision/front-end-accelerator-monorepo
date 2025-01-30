export const AiAvatar = () => (
  <img
    alt="AI Avatar"
    className="cw-h-12 cw-aspect-square cw-rounded-full"
    src={import.meta.env.VITE_THEME_AI_AVATAR}
  />
);

export const UserAvatar = () => (
  <img
    alt="User Avatar"
    className="cw-h-12 cw-aspect-square cw-rounded-full"
    src={import.meta.env.VITE_THEME_USER_AVATAR}
  />
);
