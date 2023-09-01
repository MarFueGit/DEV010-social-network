import login from '../../src/views/login';

describe('view login', () => {
  it('renderiza login', () => {
    const container = login();
    expect(container).not.toBeUndefined();
  });
  it('renderiza login y da click en olvide mi contraseña', () => {
    const container = login();
    expect(container).not.toBeUndefined();
  });
});
