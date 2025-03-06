export interface AuthContextType {
  userProfile: IUserProfile | undefined;
  setUserProfile: React.Dispatch<
    React.SetStateAction<IUserProfile | undefined>
  >;
}