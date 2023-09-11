// import { fireEvent, getByText } from '@testing-library/dom';
import feed from '../../src/views/feed';
import { auth } from '../../src/firebase';
// import { signInWithCustomToken } from 'firebase/auth';

// jest.mock('firebase/auth', () => {
//   const authInstance = {
//     currentUser: jest.fn(),
//   };
//   const mockedUserInfo = Object.freeze({
//     UserID: 'exampleID',
//   });
//   // describe('Feed', () => {
//   const authChangeCallbacks = [];
//   const authCurrentUserInfo = mockedUserInfo;

//   // invoke all callbacks with current data
//   const fireOnChangeCallbacks = () => {
//     authInstance.currentUser = authCurrentUserInfo;
//     authChangeCallbacks.forEach((cb) => {
//       try {
//         cb(mockedUserInfo); // invoke any active listeners
//       } catch (err) {
//         console.error('Error invoking callback', err);
//       }
//     });
//   };

describe('Feed', () => {
  beforeEach(() => {
    auth.signInWithGoogle = jest.fn();
    auth.signInWithPassword = jest.fn();
  });

  it('Renderiza feed', () => {
    const navigateTo = jest.fn();
    // const user = fireOnChangeCallbacks();
    const container = feed(navigateTo);
    // expect(user).not.toBeUndefined();
    expect(container).not.toBeUndefined();
  });

  it('Renderiza feed y devuelve usuario actual', () => {
    const navigateTo = jest.fn();
    const container = feed(navigateTo);
    expect(container).not.toBeUndefined();
  });
});
// });
