/**
 * Danh sach su kien tracking cua website.
 * Dat ten theo snake_case de tuong thich GA4.
 */
export const AnalyticsEvent = {
  ClickPhone: 'click_phone',
  ClickZalo: 'click_zalo',
  ClickCourse: 'click_course',
  OpenForm: 'open_lead_form',
  SubmitForm: 'submit_lead_form',
  SubmitFormSuccess: 'submit_lead_form_success',
  SubmitFormError: 'submit_lead_form_error',
  ClickMaps: 'click_google_maps',
  ClickVideo: 'click_video',
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

export type AnalyticsPayload = Record<
  string,
  string | number | boolean | undefined
>;
