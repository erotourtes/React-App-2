import * as hooks from '@/redux/api/hooks';

export type HooksT = keyof typeof hooks;
export type MockHooksT = Record<HooksT, jest.Mock>;