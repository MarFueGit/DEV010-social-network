import { resetPasswordUser } from '../../../../src/lib/auth';

jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: () =>
    new Promise((resolve) => resolve({ user: 'Mary' })),
  getAuth: jest.fn(),
}));
describe('lib auth', () => {
  it('resetPasswordUser', async () => {
    const user = await resetPasswordUser();
    expect(user).toBe(true);
  });
});
