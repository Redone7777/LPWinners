-- ========================================
-- DONNÉES DE TEST - LP WINNERS
-- ========================================

-- Insertion de champions
INSERT INTO champions (riot_id, name, title, role, difficulty, image_url, description) VALUES
('Aatrox', 'Aatrox', 'L''épée de Darkin', 'TOP', 8, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg', 'Champion combattant très agressif'),
('Ahri', 'Ahri', 'La renarde à neuf queues', 'MID', 5, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg', 'Mage assassin avec mobilité'),
('Ashe', 'Ashe', 'La reine de Freljord', 'ADC', 4, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg', 'Tireuse avec contrôle de foule'),
('Blitzcrank', 'Blitzcrank', 'Le grand golem à vapeur', 'SUPPORT', 7, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_0.jpg', 'Support tank avec grab légendaire'),
('Darius', 'Darius', 'La main de Noxus', 'TOP', 6, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg', 'Combattant brutal top lane'),
('Ezreal', 'Ezreal', 'L''explorateur prodigue', 'ADC', 7, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg', 'ADC mobile avec poke'),
('Garen', 'Garen', 'La puissance de Demacia', 'TOP', 3, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg', 'Champion simple et efficace'),
('Janna', 'Janna', 'La furie de la tempête', 'SUPPORT', 5, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Janna_0.jpg', 'Support enchanteur de protection'),
('Jinx', 'Jinx', 'La gâchette folle', 'ADC', 6, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg', 'ADC hypercarry avec reset'),
('KhaZix', 'Kha''Zix', 'Le prédateur du vide', 'JUNGLE', 7, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_0.jpg', 'Assassin jungle qui évolue'),
('LeeSin', 'Lee Sin', 'Le moine aveugle', 'JUNGLE', 9, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg', 'Jungler skill-based très mobile'),
('Lux', 'Lux', 'La dame de lumière', 'MID', 5, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg', 'Mage artilleur avec contrôle'),
('MasterYi', 'Master Yi', 'L''épéiste Wuju', 'JUNGLE', 4, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_0.jpg', 'Jungler dégâts avec reset'),
('Morgana', 'Morgana', 'La déchue', 'SUPPORT', 5, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_0.jpg', 'Support avec cage et bouclier'),
('Thresh', 'Thresh', 'Le gardien des chaînes', 'SUPPORT', 8, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg', 'Support playmaker avec hook et lanterne'),
('Yasuo', 'Yasuo', 'L''impitoyable', 'MID', 10, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg', 'Champion très technique avec beaucoup de outplay'),
('Zed', 'Zed', 'Le maître des ombres', 'MID', 9, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zed_0.jpg', 'Assassin mid avec ombres'),
('Vayne', 'Vayne', 'La traque use de la nuit', 'ADC', 8, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_0.jpg', 'ADC anti-tank hyper scaling'),
('Lulu', 'Lulu', 'La fée sorcière', 'SUPPORT', 5, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg', 'Support enchanteur polyvalent'),
('Pyke', 'Pyke', 'L''éventreur des quais', 'SUPPORT', 7, 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg', 'Support assassin unique');

-- Insertion de joueurs de test
INSERT INTO players (summoner_name, region, puuid, level, profile_icon, rank_tier, rank_division, lp, wins, losses) VALUES
('Faker', 'KR', 'puuid-faker-123', 450, 29, 'CHALLENGER', 'I', 1200, 350, 180),
('Caps', 'EUW', 'puuid-caps-456', 420, 22, 'GRANDMASTER', 'I', 850, 280, 150),
('Rekkles', 'EUW', 'puuid-rekkles-789', 380, 15, 'MASTER', 'I', 450, 220, 140),
('TheShy', 'KR', 'puuid-theshy-111', 400, 31, 'GRANDMASTER', 'I', 780, 310, 170),
('Uzi', 'KR', 'puuid-uzi-222', 410, 27, 'MASTER', 'I', 520, 240, 160),
('Bjergsen', 'NA', 'puuid-bjerg-333', 390, 18, 'GRANDMASTER', 'I', 690, 260, 145),
('Doublelift', 'NA', 'puuid-dl-444', 370, 12, 'MASTER', 'I', 380, 200, 130),
('Perkz', 'EUW', 'puuid-perkz-555', 400, 25, 'GRANDMASTER', 'I', 720, 270, 155),
('Rookie', 'KR', 'puuid-rookie-666', 430, 30, 'CHALLENGER', 'I', 1100, 340, 175),
('JackeyLove', 'KR', 'puuid-jackey-777', 395, 21, 'MASTER', 'I', 490, 230, 148);

-- Insertion de matchs
INSERT INTO matches (game_id, region, game_mode, game_date, game_duration, patch, winning_team) VALUES
('EUW1_6789012345', 'EUW', 'RANKED_SOLO_5x5', '2025-12-15 14:30:00', 1850, '25.1', 100),
('EUW1_6789012346', 'EUW', 'RANKED_SOLO_5x5', '2025-12-15 16:45:00', 2120, '25.1', 200),
('KR_1234567890', 'KR', 'RANKED_SOLO_5x5', '2025-12-16 10:20:00', 1680, '25.1', 100),
('NA1_9876543210', 'NA', 'RANKED_SOLO_5x5', '2025-12-16 20:15:00', 1950, '25.1', 200),
('EUW1_6789012347', 'EUW', 'RANKED_SOLO_5x5', '2025-12-17 12:00:00', 2340, '25.1', 100);

-- Insertion de participants (simplifié pour l'exemple)
-- Match 1 (EUW)
INSERT INTO match_participants (match_id, player_id, champion_id, team_id, position, kills, deaths, assists, cs, gold, damage_dealt, vision_score, win) VALUES
(1, 2, 7, 100, 'TOP', 4, 2, 8, 185, 11200, 18500, 25, TRUE),      -- Caps avec Garen
(1, 3, 9, 100, 'ADC', 12, 3, 6, 220, 15800, 35200, 18, TRUE),     -- Rekkles avec Jinx
(1, 8, 12, 200, 'MID', 5, 8, 4, 165, 9800, 22100, 20, FALSE);     -- Perkz avec Lux

-- Match 2 (EUW)
INSERT INTO match_participants (match_id, player_id, champion_id, team_id, position, kills, deaths, assists, cs, gold, damage_dealt, vision_score, win) VALUES
(2, 2, 16, 200, 'MID', 15, 4, 9, 195, 16200, 38500, 22, TRUE),     -- Caps avec Yasuo
(2, 3, 3, 100, 'ADC', 7, 6, 10, 210, 13500, 28900, 19, FALSE);     -- Rekkles avec Ashe

-- Match 3 (KR)
INSERT INTO match_participants (match_id, player_id, champion_id, team_id, position, kills, deaths, assists, cs, gold, damage_dealt, vision_score, win) VALUES
(3, 1, 17, 100, 'MID', 18, 2, 7, 205, 17800, 42300, 28, TRUE),     -- Faker avec Zed
(3, 9, 2, 100, 'MID', 10, 3, 12, 188, 14200, 31200, 24, TRUE);     -- Rookie avec Ahri

-- Insertion de posts forum
INSERT INTO forum_posts (author_id, champion_id, title, content, upvotes, downvotes, views) VALUES
(1, 16, 'Guide Yasuo Complet 2025', 'Voici mon guide complet pour Yasuo en mid lane. Build optimal : Infinity Edge > Phantom Dancer > Immortal Shieldbow. Pour les runes, prenez Conquérant en primaire...', 245, 12, 5420),
(2, 7, 'Garen Top Imbattable', 'Build tank avec Stridebreaker et Plaque Gargouille. Garen est un excellent pick pour les débutants et reste efficace même en haut elo...', 189, 8, 3210),
(3, 9, 'Jinx ADC - Comment Carry', 'Le secret avec Jinx c''est de bien farm early et de jouer safe. Une fois que vous avez 3 items, vous pouvez 1v9. Tips : Gardez votre E pour vous protéger du gank...', 312, 15, 6780),
(8, 12, 'Lux Support ou Mid?', 'Discussion sur le meilleur rôle pour Lux en saison 25. Personnellement je pense que mid est meilleur car elle a besoin de gold pour les items...', 98, 34, 2150),
(1, 10, 'Kha''Zix Jungle Route Optimale', 'Start Red Buff > Krugs > Raptors > Level 3 gank mid. Cette route vous donne un gank puissant level 3. N''oubliez pas d''évoluer Q en premier...', 176, 9, 4120);

-- Insertion de commentaires
INSERT INTO forum_comments (post_id, author_id, content, upvotes) VALUES
(1, 3, 'Excellent guide ! Par contre je ne suis pas d''accord sur Immortal Shieldbow, je préfère Bloodthirster en 3ème item', 45),
(1, 8, 'Merci pour le guide, ça m''a beaucoup aidé à progresser avec Yasuo', 23),
(2, 1, 'Garen est vraiment underrated, bon guide !', 34),
(3, 2, 'Totalement d''accord, Jinx scale comme une folle late game', 28),
(5, 9, 'Je préfère start Blue buff perso mais ta route est intéressante', 12);

-- Afficher un résumé des données insérées
SELECT 'Champions insérés' as type, COUNT(*) as count FROM champions
UNION ALL
SELECT 'Joueurs insérés', COUNT(*) FROM players
UNION ALL
SELECT 'Matchs insérés', COUNT(*) FROM matches
UNION ALL
SELECT 'Participants insérés', COUNT(*) FROM match_participants
UNION ALL
SELECT 'Posts forum insérés', COUNT(*) FROM forum_posts
UNION ALL
SELECT 'Commentaires insérés', COUNT(*) FROM forum_comments;
