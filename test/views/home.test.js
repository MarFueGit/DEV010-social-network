import home from '../../src/views/home';

describe('view home', () => {
  it('renderiza home', () => {
    const container = home();
    expect(container).not.toBeUndefined();
  });
});
