declare global {
  interface JQuery {
    sideNav(options: { closeOnClick: boolean }): void;
  }
}

export default {};
