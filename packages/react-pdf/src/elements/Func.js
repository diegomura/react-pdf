class Func {
  constructor(props) {
    this.instance = props.instance;
  }

  call(...args) {
    return this.instance(...args);
  }
}

export default Func;
