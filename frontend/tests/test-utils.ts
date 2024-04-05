import * as hooks from '@/redux/api/hooks';

export type HooksT = keyof typeof hooks;
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export type PartialMockHooksT = Partial<Record<HooksT, any>>;
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export type MockHooksT = Record<HooksT, any>;