const TestId = {
  registerTestId(testId) {
    const layout = this.getAbsoluteLayout();
    const padding = this.padding;
    const margin = this.margin;
    const pageNumber = this.page.pageNumber;

    if (this.root.renderOptions && this.root.renderOptions.testIdOutputData) {
      if (this.root.renderOptions.testIdOutputData[testId] != null) {
        console.warn('Multiple elements registered with testID: ' + testId);
      }
      this.root.renderOptions.testIdOutputData[testId] = {
        layout,
        padding,
        margin,
        pageNumber,
      };
    }
  },
};

export default TestId;
