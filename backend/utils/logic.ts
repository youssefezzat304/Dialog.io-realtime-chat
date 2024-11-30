export const chooseRandomAvatar = () => {
  const numAvatars = 6;

  const randomNumber = Math.floor(Math.random() * numAvatars) + 1;

  const filename = `/assets/avatars/avatarplaceholder${randomNumber}.svg`;

  return filename;
};
