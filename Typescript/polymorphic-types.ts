type ErrorState = {
  isReady: boolean;
  isLoggedIn: false;
  user?: never;
  workspace?: never;
};

type UserState = {
  isReady: boolean;
  isLoggedIn: true;
  user: { name: string; email: string };
};

type UserContextType = ErrorState | UserState;
