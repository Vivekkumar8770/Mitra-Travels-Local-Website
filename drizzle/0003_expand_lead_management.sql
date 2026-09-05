ALTER TABLE `enquiries` ADD `alternate_phone` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `city` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `state` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `lead_source` text DEFAULT 'Website' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `drop_location` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `travel_end_date` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `rooms` integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `budget` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `priority` text DEFAULT 'Warm' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `next_follow_up_at` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `assigned_to` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `quotation_amount` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `booking_status` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `deal_value` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `outcome_reason` text DEFAULT '' NOT NULL;
--> statement-breakpoint
CREATE TABLE `lead_follow_ups` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `enquiry_id` integer NOT NULL,
  `follow_up_at` text NOT NULL,
  `method` text NOT NULL,
  `conversation_notes` text DEFAULT '' NOT NULL,
  `customer_response` text DEFAULT '' NOT NULL,
  `updated_status` text DEFAULT '' NOT NULL,
  `next_follow_up_at` text DEFAULT '' NOT NULL,
  `added_by` text DEFAULT 'Administrator' NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_lead_follow_ups_enquiry_created` ON `lead_follow_ups` (`enquiry_id`, `created_at`);