import error from '../../src/views/error';

describe('vista error', () => {
  it('renderiza vista error ', () => {
    const container = error();
    expect(container).not.toBeUndefined();
  });
});
