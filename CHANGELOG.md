# CHANGELOG

## [v0.7.0](https://github.com/hliutongco/stagedoor/releases/tag/v0.7.0) - 2025-01-28 13:16:21

This release sees the completion of the My Profile/public profile MVP

### Minor Release

- PlaybillCollection:
  - finish my-profile (#59) ([86a740a](https://github.com/hliutongco/stagedoor/commit/86a740a3ab0c2e5384d9cf76aa80752e81fbfa8d)) ([#59](https://github.com/hliutongco/stagedoor/pull/59))

### Patch Release

- general:
  - fix/add description input (#58) ([a62d77c](https://github.com/hliutongco/stagedoor/commit/a62d77ce5e84ea3c56a810bd0ca0a231c8d3abd8)) ([#58](https://github.com/hliutongco/stagedoor/pull/58))
  - fix/add cloudinary (#55) ([3b11167](https://github.com/hliutongco/stagedoor/commit/3b11167e0eb2280e86bf762fea31f8b0b78642f6)) ([#55](https://github.com/hliutongco/stagedoor/pull/55))

- CloudinaryImage:
  - switch to CloudinaryImage component (#57) ([88794cc](https://github.com/hliutongco/stagedoor/commit/88794cc5cdd915501ea17ec9a0654f18c7c26008)) ([#57](https://github.com/hliutongco/stagedoor/pull/57))

- schema:
  - add description (#56) ([7c51829](https://github.com/hliutongco/stagedoor/commit/7c518295ac60601be7a4cf14c19a0f378df0be54)) ([#56](https://github.com/hliutongco/stagedoor/pull/56))

- users/[username]:
  - add user view route (#54) ([f635bb2](https://github.com/hliutongco/stagedoor/commit/f635bb2dba438e5d3a47d6bc63ee33c5e608fcf0)) ([#54](https://github.com/hliutongco/stagedoor/pull/54))

- CHANGELOG:
  - update release notes ([f1f0e2e](https://github.com/hliutongco/stagedoor/commit/f1f0e2e825ac191a86c9468114d5ea7a69b166ed))

- home:
  - add reviews to the home page (#53) ([2be4fa6](https://github.com/hliutongco/stagedoor/commit/2be4fa6c0e8c6ddfa88a22b644c37c1bc410d906)) ([#53](https://github.com/hliutongco/stagedoor/pull/53))

- loading:
  - adjust loading screens and fix star ratings (#52) ([fe19ed6](https://github.com/hliutongco/stagedoor/commit/fe19ed6fd8bfec05838df9e7a05828c91cf52c72)) ([#52](https://github.com/hliutongco/stagedoor/pull/52))

- reviews/[id]: add reviews page (#51:
  - fix(reviews/[id]: add reviews page (#51) ([4cf53af](https://github.com/hliutongco/stagedoor/commit/4cf53af548f08e9a94d7650a60281e21fd9f4e1a)) ([#51](https://github.com/hliutongco/stagedoor/pull/51))

## [v0.6.0](https://github.com/hliutongco/stagedoor/releases/tag/v0.6.0) - 2025-01-21 05:36:25

- Users can edit and delete reviews
- Users can see their reviews on their profile

### Minor Release

- my-profile:
  - add reviews to user profile (#50) ([812790b](https://github.com/hliutongco/stagedoor/commit/812790b6ec26c3c108c204c34791037abe25fd60)) ([#50](https://github.com/hliutongco/stagedoor/pull/50))

### Patch Release

- schema:
  - set up createUser and deleteUser methods (#49) ([723ff50](https://github.com/hliutongco/stagedoor/commit/723ff5087a3bcc0f1687609de503c2f0e5e9b791)) ([#49](https://github.com/hliutongco/stagedoor/pull/49))
  - add users table and usershow review relationship (#45) ([07a8bdc](https://github.com/hliutongco/stagedoor/commit/07a8bdc441ec06efb0c1621c8fa4f6a70e56e61b)) ([#45](https://github.com/hliutongco/stagedoor/pull/45))

- ReviewCard:
  - add edit review functionality (#48) ([d691582](https://github.com/hliutongco/stagedoor/commit/d691582c6cf5fe05c4bb11bbad26f0a5457e4316)) ([#48](https://github.com/hliutongco/stagedoor/pull/48))
  - add ability to delete (#47) ([c0a8117](https://github.com/hliutongco/stagedoor/commit/c0a811779d959f44a3afe09561d912a5f7800de4)) ([#47](https://github.com/hliutongco/stagedoor/pull/47))

- general:
  - fix/watched button (#46) ([2c6de40](https://github.com/hliutongco/stagedoor/commit/2c6de4069e09c48c5c8eba2b2624ba608a553d04)) ([#46](https://github.com/hliutongco/stagedoor/pull/46))

- CHANGELOG:
  - update release notes ([cffaa8d](https://github.com/hliutongco/stagedoor/commit/cffaa8dd3450a0aee3a5889c4529ce1b8aaff548))

## [v0.5.0](https://github.com/hliutongco/stagedoor/releases/tag/v0.5.0) - 2025-01-16 19:26:34

Users can now create reviews using the Create a Review modal on the show view pages

### Minor Release

- ReviewModal:
  - add create review form and review trpc router (#43) ([838c572](https://github.com/hliutongco/stagedoor/commit/838c572ffa4d27e14fba5330c7d48ca3d9105bb0)) ([#43](https://github.com/hliutongco/stagedoor/pull/43))

- schema:
  - add usershows table (#30) ([734f235](https://github.com/hliutongco/stagedoor/commit/734f2351c49fda7354d966b94ce7e25df5b9c983)) ([#30](https://github.com/hliutongco/stagedoor/pull/30))

- star-rating:
  - add star rating component (#29) ([512103e](https://github.com/hliutongco/stagedoor/commit/512103ed7c36b71feba82c9fb7f6bc4861a9390a)) ([#29](https://github.com/hliutongco/stagedoor/pull/29))

### Patch Release

- tailwind.config:
  - fix mobile view and star rating (#42) ([a4e506f](https://github.com/hliutongco/stagedoor/commit/a4e506f26ea55f09194534197934cffc65e869c4)) ([#42](https://github.com/hliutongco/stagedoor/pull/42))
  - tailwind theme (#37) ([d60d34c](https://github.com/hliutongco/stagedoor/commit/d60d34c3fdcc3dbdedd8a18b9fba7ee2d935f8c2)) ([#37](https://github.com/hliutongco/stagedoor/pull/37))

- RatingWatchedContainer:
  - attempt to fix bug (#40) ([8856ed9](https://github.com/hliutongco/stagedoor/commit/8856ed96f40bf2b1ea83c3a81a2d1bc329ee4947)) ([#40](https://github.com/hliutongco/stagedoor/pull/40))

- loading:
  - loading screens (#39) ([77316d2](https://github.com/hliutongco/stagedoor/commit/77316d2a40d5f89ac694a6c74cb2f77b29223aec)) ([#39](https://github.com/hliutongco/stagedoor/pull/39))

- ShowsList:
  - visual changes (#38) ([9dac49e](https://github.com/hliutongco/stagedoor/commit/9dac49e97868a6ea43671719b99564b4fa2bacf5)) ([#38](https://github.com/hliutongco/stagedoor/pull/38))

- error.tsx:
  - add generic error pages (#36) ([44dcda6](https://github.com/hliutongco/stagedoor/commit/44dcda640ce1e72e37e904aa01d4acdc38bcf656)) ([#36](https://github.com/hliutongco/stagedoor/pull/36))

- showslist:
  - data refresh (#35) ([94b30bd](https://github.com/hliutongco/stagedoor/commit/94b30bdfdd094b9ee3f640251c53cdc09f1866b4)) ([#35](https://github.com/hliutongco/stagedoor/pull/35))

- my-profile:
  - add static star rating to user profile (#34) ([3487180](https://github.com/hliutongco/stagedoor/commit/34871803e17d469d42f28c95565e81b4d37e5d0d)) ([#34](https://github.com/hliutongco/stagedoor/pull/34))

- general:
  - add slug to url (#33) ([4260689](https://github.com/hliutongco/stagedoor/commit/4260689c2fb50485bdd3198f2e3f0ea814305d8a)) ([#33](https://github.com/hliutongco/stagedoor/pull/33))

- migrations:
  - apply migrations correctly ([8ab24ad](https://github.com/hliutongco/stagedoor/commit/8ab24ad9b6fe95cd1934d4a9e71dc4bc25c0e4d0))
  - split hasReviewOrRating into two columns (#31) ([acab7c0](https://github.com/hliutongco/stagedoor/commit/acab7c0d18a597d0413c79282fd07282f47a9eea)) ([#31](https://github.com/hliutongco/stagedoor/pull/31))

- schema:
  - add slug to shows table (#32) ([bd7fe84](https://github.com/hliutongco/stagedoor/commit/bd7fe84adcb3b9578b1b59a1ceb69912db010153)) ([#32](https://github.com/hliutongco/stagedoor/pull/32))

- CHANGELOG:
  - update release notes ([10824f5](https://github.com/hliutongco/stagedoor/commit/10824f50810c7eac6eb8f273415d84c547b2c464))

- WatchedCount:
  - add watched count (#28) ([fbe7180](https://github.com/hliutongco/stagedoor/commit/fbe718037f559913983eafec67e1719999229fd2)) ([#28](https://github.com/hliutongco/stagedoor/pull/28))

## [v0.2.0](https://github.com/hliutongco/stagedoor/releases/tag/v0.2.0) - 2025-01-04 19:11:36

- Add Shows data to the homepage
- Add basic user profile
- Add functionality for marking a show as watched

### Minor Release

- WatchedShow:
  - finish up watched show functionality and basic profile view (#27) ([5299880](https://github.com/hliutongco/stagedoor/commit/5299880e577986a58fd66f43d7748a2d522b953f)) ([#27](https://github.com/hliutongco/stagedoor/pull/27))

### Patch Release

- WatchedButton:
  - add watched show functionality (#26) ([5d76dd6](https://github.com/hliutongco/stagedoor/commit/5d76dd6f976ee4654a08c62df6df204bf81d82ba)) ([#26](https://github.com/hliutongco/stagedoor/pull/26))

- migrations:
  - add watchedShow table (#25) ([a27f218](https://github.com/hliutongco/stagedoor/commit/a27f21823549bee5b6b035fe334d4bf2f5757ff2)) ([#25](https://github.com/hliutongco/stagedoor/pull/25))
  - add playbill images (#23) ([48aa460](https://github.com/hliutongco/stagedoor/commit/48aa460ff8b5dfa9fb005ed957f8f08cf5640df1)) ([#23](https://github.com/hliutongco/stagedoor/pull/23))
  - change id to uuid type (#15) ([afaf065](https://github.com/hliutongco/stagedoor/commit/afaf06595ecf3ecf88d1d035e41e26b3440b67ab)) ([#15](https://github.com/hliutongco/stagedoor/pull/15))

- github/workflows:
  - add title checker workflow (#22) ([8c79b7b](https://github.com/hliutongco/stagedoor/commit/8c79b7b54b2385fdba970ed7f7de28e11aa2ccd8)) ([#22](https://github.com/hliutongco/stagedoor/pull/22))
  - change the release action (#21) ([d46c7cf](https://github.com/hliutongco/stagedoor/commit/d46c7cf93272267491cd74b594263ef0124e9385)) ([#21](https://github.com/hliutongco/stagedoor/pull/21))
  - fix branch name ([065b3f1](https://github.com/hliutongco/stagedoor/commit/065b3f162d34a327391bf0a433797c244167f575)) ([#20](https://github.com/hliutongco/stagedoor/pull/20))
  - try adding a new create tag workflow (#19) ([974730c](https://github.com/hliutongco/stagedoor/commit/974730c391562cf567c937e39951a6461875976c)) ([#19](https://github.com/hliutongco/stagedoor/pull/19))

- CHANGELOG:
  - update release notes ([f48ff66](https://github.com/hliutongco/stagedoor/commit/f48ff66ca41b2674bbce2008ad4ef210ac9fa920))

## [v0.1.0](https://github.com/hliutongco/stagedoor/releases/tag/v0.1.0) - 2024-12-29 18:04:45

Add public and private procedures for tRPC as well as the setup for a basic tRPC API

### Minor Release

- github/workflows:
  - add action for creating tags when merging to master ([71441a5](https://github.com/hliutongco/stagedoor/commit/71441a5ea5be978ca6075d0c5e41d85ba29938e2)) ([#3](https://github.com/hliutongco/stagedoor/pull/3))

### Patch Release

- CHANGELOG:
  - add ShadCN card ([3bd4b9c](https://github.com/hliutongco/stagedoor/commit/3bd4b9c64c6db9f14ff53a0a9489d1280e64420f)) ([#7](https://github.com/hliutongco/stagedoor/pull/7))

- card:
  - add ShadCN card ([fd45967](https://github.com/hliutongco/stagedoor/commit/fd459678666d12ef9dfbaa10fbb029d376918f5a)) ([#7](https://github.com/hliutongco/stagedoor/pull/7))

- schema:
  - fix typos with columns ([8ad7442](https://github.com/hliutongco/stagedoor/commit/8ad7442b80292df3f6844898195d32e6e99e391f)) ([#5](https://github.com/hliutongco/stagedoor/pull/5))
  - add base for review table ([10c5292](https://github.com/hliutongco/stagedoor/commit/10c5292f19f9ddfbbfc6571020cfd89155d8e859)) ([#5](https://github.com/hliutongco/stagedoor/pull/5))

- github/workflows:
  - fix wrong branch name in github action ([8617055](https://github.com/hliutongco/stagedoor/commit/861705514560b4110cc3d930dd9e96e882742c5d)) ([#4](https://github.com/hliutongco/stagedoor/pull/4))

- src/components:
  - add ShadCN and custom paths config ([1c7e366](https://github.com/hliutongco/stagedoor/commit/1c7e366dea0aa48449662cff6061ebeb5b3e057a)) ([#3](https://github.com/hliutongco/stagedoor/pull/3))

## [v0.0.1](https://github.com/hliutongco/stagedoor/releases/tag/v0.0.1) - 2024-12-11 00:02:30

This release includes basic setup for aligning the Neon branches with Github changes + Vercel deployments

### Minor Release

- db:
  - begin neon and drizzle setup ([4e238ba](https://github.com/hliutongco/stagedoor/commit/4e238ba0cc4a9f0ef00a2b9c9cbba3dc6fad3bff))

- drizzle.config:
  - add drizzle setup ([b4c0af8](https://github.com/hliutongco/stagedoor/commit/b4c0af856bb0fda0ff0213ce0627be784ae9624a))

### Patch Release

- github/workflows:
  - remove invalid keyword ([87f11e2](https://github.com/hliutongco/stagedoor/commit/87f11e20492f3464ff0036b0120563e0c21bc96f)) ([#2](https://github.com/hliutongco/stagedoor/pull/2))
  - fix deploy-production script ([5508856](https://github.com/hliutongco/stagedoor/commit/55088563178197009d99401ec17457919c571ddf)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - add pnpm version ([b415f92](https://github.com/hliutongco/stagedoor/commit/b415f9217f5a5ad311f6e2219c818787233daf86)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - add installation step ([0ca605f](https://github.com/hliutongco/stagedoor/commit/0ca605f73155d49665b41a73a3f9ab9d15910c97)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try getting different error message ([9c9f532](https://github.com/hliutongco/stagedoor/commit/9c9f532fb9ecd51a704ab67ee4b57a4c91b1d96f)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try adding npm command ([9e3f341](https://github.com/hliutongco/stagedoor/commit/9e3f341fc4fc471ea5b72b585df3986f92bac80c)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - use npx ([00e36ed](https://github.com/hliutongco/stagedoor/commit/00e36ed65141f287ca7d5b373915b55c311811aa)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - replace prisma refs with drizzle ([b758822](https://github.com/hliutongco/stagedoor/commit/b758822d65e699b0cecfe95c42d7fa42a7dff353)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try adding neondb auto branch creation/deletion flow ([5410a0e](https://github.com/hliutongco/stagedoor/commit/5410a0e362f8ada615f9c22cb7d6c3fdc89a73e2)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))

\* *This CHANGELOG was automatically generated by [auto-generate-changelog](https://github.com/BobAnkh/auto-generate-changelog)*
