import signUp from '../../src/views/signUp';

describe('view signUp', () => {
  it('renderiza signup', () => {
    const container = signUp();
    expect(container).not.toBeUndefined();
  });
});
