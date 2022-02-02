export const waitForAsyncActionsToFinish = () => {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      resolve();
    }, 0);
  });
};

// test case
it('this is how you run async tests waiting for async actions', async (done) => {
  // MyComp makes async calls during mount
  const wrapper = shallow(<MyComp {...props} />);

  await waitForAsyncActionsToFinish();

  expect(wrapper.state().data.length).toEqual(2);
  expect(wrapper.state().data[0]).toEqual(100);

  // invoke await waitForAsyncActionsToFinish(); for as many time you invoke async calls

  expect(wrapper.state().data.length).toEqual(4);
  expect(wrapper.state().data[3]).toEqual(300);

  // invoke done() at the end
  done();
});
