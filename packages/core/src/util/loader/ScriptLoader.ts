// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

/**
 * A helper class to load additional scripts in runtime.
 *
 * @class ScriptLoader
 * @param url: string
 */
export class ScriptLoader {
  private doc: HTMLDocument;
  private head: HTMLHeadElement;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.doc = document;
    this.head = this.doc.getElementsByTagName('head')[0];
  }

  /**
   * Create a new script tag, wet it in head and load the script with a callback,
   * which will be called after loading the script.
   *
   * @name loadScript
   * @return Promise<any>
   */
  public loadScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const scriptTag: HTMLScriptElement = this.doc.createElement('script');
      const onResolve = (): void => {
        resolve();
      };

      scriptTag.onload = onResolve;

      scriptTag.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
        reject({ event, error });
      };

      // IE specific event ('onreadystatechange')
      (scriptTag as any).onreadystatechange = () => {
        if ((scriptTag as any).readyState && (scriptTag as any).readyState === 'complete') {
          onResolve();
        }
      };

      scriptTag.src = this.url;
      this.head.insertBefore(scriptTag, this.head.lastChild);
    });
  };
}
