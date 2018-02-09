// tslint:disable max-classes-per-file

declare module 'carbon-components' {

  /**
   * The callback called once changing state is finished or is canceled.
   * @callback EventedState~changeStateCallback
   * @param {Error} error
   *   An error object with `true` in its `canceled` property if changing state is canceled.
   *   Cancellation happens if the handler of a custom event, that is fired before changing state happens,
   *   calls `.preventDefault()` against the event.
   * @param {boolean} keptState
   *   `true` if the call to {@link EventedState#changeState `.changeState()`} didn't cause actual change in state.
   */
  type EventedStateChangeStateCallback = (error?: Error | null, keptState?: boolean) => void;

  interface InitComponentBySearch {
    init(_: Element): void;
  }

  interface EventedState {
    setState(state?: string | {} | EventedStateChangeStateCallback, detail?: {} | EventedStateChangeStateCallback, callback?: EventedStateChangeStateCallback): void;
  }

  interface EventedShowHideState {
    show(evtOrElem?: Event | Element | EventedStateChangeStateCallback, callback?: EventedStateChangeStateCallback): void;
    hide(evtOrElem?: Event | Element | EventedStateChangeStateCallback, callback?: EventedStateChangeStateCallback): void;
  }

  interface CreateComponent<T> {
    create(_: Element, options?: { [ key: string ]: string }): T;
    release(): void;
  }

  // DataTableV2
  interface DataTableV2 extends CreateComponent<DataTableV2>, InitComponentBySearch {
  }

  export const DataTableV2: DataTableV2;

  // Modal
  interface Modal extends CreateComponent<Modal>, EventedShowHideState {
  }

  export const Modal: Modal;

  // FileUploader
  interface FileUploader extends CreateComponent<FileUploader>, InitComponentBySearch, EventedState {
  }

  export const FileUploader: FileUploader;

  // ContentSwitcher
  interface ContentSwitcher extends CreateComponent<ContentSwitcher>, InitComponentBySearch, EventedState {
  }

  export const ContentSwitcher: ContentSwitcher;

  // Tab
  // tslint:disable-next-line no-empty-interface
  interface Tab extends ContentSwitcher {
  }

  export const Tab: Tab;
}
