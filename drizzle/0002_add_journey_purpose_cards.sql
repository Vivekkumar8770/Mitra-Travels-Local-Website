CREATE TABLE `journey_purpose_cards` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `icon` text DEFAULT 'Route' NOT NULL,
  `button_text` text DEFAULT 'Explore journey' NOT NULL,
  `destination_url` text NOT NULL,
  `link_type` text DEFAULT 'internal' NOT NULL,
  `open_in_new_tab` integer DEFAULT false NOT NULL,
  `display_order` integer DEFAULT 0 NOT NULL,
  `active` integer DEFAULT true NOT NULL,
  `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_journey_purpose_cards_active_order` ON `journey_purpose_cards` (`active`, `display_order`);
--> statement-breakpoint
INSERT INTO `journey_purpose_cards` (`title`, `description`, `icon`, `button_text`, `destination_url`, `link_type`, `open_in_new_tab`, `display_order`, `active`) VALUES
('Pilgrimage journeys', 'Muktinath, Pashupatinath, Janakpur and sacred routes planned with care.', 'ShieldCheck', 'Explore journey', '/packages/muktinath-pilgrimage-journey', 'internal', 0, 1, 1),
('Heritage & culture', 'Kathmandu temples, Lumbini, local streets and meaningful experiences.', 'MapPinned', 'Explore journey', '/packages/kathmandu-pokhara-discovery', 'internal', 0, 2, 1),
('Mountains & lakes', 'Pokhara, Himalayan landscapes and scenic Nepal road journeys.', 'Sparkles', 'Explore journey', '/packages/kathmandu-pokhara-discovery', 'internal', 0, 3, 1),
('Cross-border road trips', 'Comfortable private travel from Raxaul with practical border support.', 'Route', 'Explore journey', '/packages', 'internal', 0, 4, 1);
