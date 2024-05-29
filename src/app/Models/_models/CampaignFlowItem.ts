import { DateTime } from "@syncfusion/ej2-angular-charts";

export interface CampaignFlowItem {
    jump_event?: string;


    id?: number;
    event_name?: string;
    parent_id?: number;
    event_order?: number;
    event_type?: string;
    event?: string;
    schedule_on?: string;
    for?: string;
    condition?: string;
    name?: string;

    campaign_id?: number;
    color?: string;
    trigger_interval_unit?: string;
    trigger_interval?: number;
    candidate_status_id?: number | null;
    channel_id?: number | null;
    temp_id?: number | null;
    trigger_mode?: string | null;
    channel_root_name?: string | null;
    trigger_date?: String;
    flow_type?: string;
    flow_up_id?: number | null;
    sms_template_id?: number | null;
    email_template_id?: number | null;
    bot_id?: number | null;
}
