declare module 'enzyme-adapter-react-16' {

  interface Constructable {
    new (): object;
  }

  const Adapter: Constructable;
  export = Adapter;
}
