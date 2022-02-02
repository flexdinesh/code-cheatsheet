/* Class pattern implementation */
class PollManagerClass {
  // default pollIntervalMS = 1e4; // 10 seconds
  // default inactivityMS = 6e4 * 30; // 30 minutes
  private POLLING_TIMER_INTERVAL_MILLISECONDS: number;
  private INACTIVITY_TIMER_MILLISECONDS: number;
  private pollingInterval: number;
  private inactivityTimeout: number;
  constructor(pollIntervalMS = 1e4, inactivityMS = 6e4 * 30) {
    this.POLLING_TIMER_INTERVAL_MILLISECONDS = pollIntervalMS;
    this.INACTIVITY_TIMER_MILLISECONDS = inactivityMS;
    this.pollingInterval = null;
    this.inactivityTimeout = null;
  }
  public startPollTimer(args: {
    apiReq: () => Promise<any>;
    responseCallback: (res: any) => Promise<any>;
    errorCallback: (err: Error) => Promise<any>;
  }): void {
    this.clearPollingTimer();
    this.pollingInterval = window.setInterval(() => {
      args
        .apiReq()
        .then((res) => args.responseCallback(res))
        .catch((e) => args.errorCallback(e));
    }, this.POLLING_TIMER_INTERVAL_MILLISECONDS);
  }
  public startPolling(args: {
    apiReq: () => Promise<any>;
    responseCallback: (res: any) => Promise<any>;
    errorCallback: (err: Error) => Promise<any>;
    inactivityCallback: () => Promise<any>;
  }): void {
    const { apiReq, responseCallback, errorCallback } = args;
    this.startInactivityTimer(args.inactivityCallback);
    this.startPollTimer({ apiReq, responseCallback, errorCallback });
  }
  private startInactivityTimer(inactivityCallback): void {
    this.clearInactivityTimer();
    this.inactivityTimeout = window.setTimeout(() => {
      this.clearPollingTimer();
      inactivityCallback();
    }, this.INACTIVITY_TIMER_MILLISECONDS);
  }
  public clearTimers() {
    this.clearPollingTimer();
    this.clearInactivityTimer();
  }
  private clearPollingTimer(): void {
    if (this.pollingInterval !== null) {
      window.clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
  private clearInactivityTimer() {
    if (this.inactivityTimeout !== null) {
      window.clearInterval(this.inactivityTimeout);
      this.inactivityTimeout = null;
    }
  }
}
/* Factory pattern implementation */

const POLLING_TIMER_INTERVAL_MS: number = 1e4; // 10 seconds
const INACTIVITY_TIMER_MS: number = 6e4 * 30; // 30 minutes

// tslint:disable: variable-name
const PollManagerFactory = (
  pollIntervalMS = POLLING_TIMER_INTERVAL_MS,
  inactivityMS = INACTIVITY_TIMER_MS
) => {
  let pollingInterval = null;
  let inactivityTimeout = null;

  const clearPollingTimer_PRIVATE = (): void => {
    if (pollingInterval !== null) {
      window.clearInterval(pollingInterval);
      pollingInterval = null;
    }
  };

  const clearInactivityTimer_PRIVATE = () => {
    if (inactivityTimeout !== null) {
      window.clearInterval(inactivityTimeout);
      inactivityTimeout = null;
    }
  };
  const clearTimers = () => {
    clearPollingTimer_PRIVATE();
    clearInactivityTimer_PRIVATE();
  };

  const startPollTimer = (args: {
    apiReq: () => Promise<any>;
    responseCallback: (res: any) => Promise<any>;
    errorCallback: (err: Error) => Promise<any>;
  }): void => {
    clearPollingTimer_PRIVATE();
    pollingInterval = window.setInterval(() => {
      args
        .apiReq()
        .then((res) => args.responseCallback(res))
        .catch((e) => args.errorCallback(e));
    }, pollIntervalMS);
  };

  const startInactivityTimer_PRIVATE = (inactivityCallback): void => {
    clearInactivityTimer_PRIVATE();
    inactivityTimeout = window.setTimeout(() => {
      clearPollingTimer_PRIVATE();
      inactivityCallback();
    }, inactivityMS);
  };

  const startPolling = (args: {
    apiReq: () => Promise<any>;
    responseCallback: (res: any) => Promise<any>;
    errorCallback: (err: Error) => Promise<any>;
    inactivityCallback: () => Promise<any>;
  }): void => {
    const { apiReq, responseCallback, errorCallback } = args;
    startInactivityTimer_PRIVATE(args.inactivityCallback);
    startPollTimer({ apiReq, responseCallback, errorCallback });
  };

  return {
    startPollTimer,
    clearTimers,
    startPolling,
  };
};

export const createPollManager = (pollIntervalMS, inactivityMS) =>
  Object.create(PollManagerFactory(pollIntervalMS, inactivityMS));
