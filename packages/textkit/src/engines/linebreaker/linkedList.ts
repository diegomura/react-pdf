/* eslint-disable max-classes-per-file */
class LinkedListNode {
  data: any;
  prev: LinkedListNode | null;
  next: LinkedListNode | null;

  constructor(data: any) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  static Node = LinkedListNode;

  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  listSize: number;
  listLength: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.listSize = 0;
    this.listLength = 0;
  }

  isLinked(node: LinkedListNode) {
    return !(
      (node &&
        node.prev === null &&
        node.next === null &&
        this.tail !== node &&
        this.head !== node) ||
      this.isEmpty()
    );
  }

  size() {
    return this.listSize;
  }

  isEmpty() {
    return this.listSize === 0;
  }

  first() {
    return this.head;
  }

  last() {
    return this.last;
  }

  forEach(callback: (node: LinkedListNode) => void) {
    let node = this.head;

    while (node !== null) {
      callback(node);
      node = node.next;
    }
  }

  at(i: number) {
    let node = this.head;
    let index = 0;

    if (i >= this.listLength || i < 0) {
      return null;
    }

    while (node !== null) {
      if (i === index) {
        return node;
      }
      node = node.next;
      index += 1;
    }
    return null;
  }

  insertAfter(node: LinkedListNode, newNode: LinkedListNode) {
    if (!this.isLinked(node)) return this;

    newNode.prev = node;
    newNode.next = node.next;

    if (node.next === null) {
      this.tail = newNode;
    } else {
      node.next.prev = newNode;
    }

    node.next = newNode;

    this.listSize += 1;

    return this;
  }

  insertBefore(node: LinkedListNode, newNode: LinkedListNode) {
    if (!this.isLinked(node)) return this;

    newNode.prev = node.prev;
    newNode.next = node;

    if (node.prev === null) {
      this.head = newNode;
    } else {
      node.prev.next = newNode;
    }

    node.prev = newNode;

    this.listSize += 1;

    return this;
  }

  push(node: LinkedListNode) {
    if (this.head === null) {
      this.unshift(node);
    } else {
      this.insertAfter(this.tail, node);
    }

    return this;
  }

  unshift(node: LinkedListNode) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      node.prev = null;
      node.next = null;
      this.listSize += 1;
    } else {
      this.insertBefore(this.head, node);
    }

    return this;
  }

  remove(node: LinkedListNode) {
    if (!this.isLinked(node)) return this;

    if (node.prev === null) {
      this.head = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (node.next === null) {
      this.tail = node.prev;
    } else {
      node.next.prev = node.prev;
    }

    this.listSize -= 1;

    return this;
  }
}

export default LinkedList;
