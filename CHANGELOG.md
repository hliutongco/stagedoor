# CHANGELOG

## [v0.1.0](https://github.com/hliutongco/stagedoor/releases/tag/v0.1.0) - 2024-12-29 18:04:45

Add public and private procedures for tRPC as well as the setup for a basic tRPC API

### Bug Fixes

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

### Minor Changes

- CHANGELOG:
  - update release notes ([cb34cd6](https://github.com/hliutongco/stagedoor/commit/cb34cd60e24cc9212b399ba9b24365581cf3de46))
  - update release notes ([649d1f8](https://github.com/hliutongco/stagedoor/commit/649d1f8a54ff63095c67302a8e3a2dd1f42d54ff))
  - ^0.0.3 ([da52afa](https://github.com/hliutongco/stagedoor/commit/da52afa1e70a3cb08a3f543c669abe18fc5b1c94))
  - add changelog file ([c82a54f](https://github.com/hliutongco/stagedoor/commit/c82a54f110504ace0ce7188316f019a26506656c)) ([#3](https://github.com/hliutongco/stagedoor/pull/3))

- github/workflows:
  - test tag creation based on package.json (#9) ([7a4763b](https://github.com/hliutongco/stagedoor/commit/7a4763b0c1d96028bf69291e35b9b73564efc572)) ([#9](https://github.com/hliutongco/stagedoor/pull/9))

- package.json:
  - v0.0.3 ([13b4d9b](https://github.com/hliutongco/stagedoor/commit/13b4d9bf8fb17c8c929761a8ad0f4317b75feb37))
  - change version to 0.0.2 ([5232919](https://github.com/hliutongco/stagedoor/commit/5232919d4ac90bdeba3a1fc15f7ded28e0ef970d)) ([#3](https://github.com/hliutongco/stagedoor/pull/3))

- tsconfig:
  - fix custom paths ([0c1a0fe](https://github.com/hliutongco/stagedoor/commit/0c1a0fefe6683730351543f61cee85901203a804)) ([#3](https://github.com/hliutongco/stagedoor/pull/3))

## [v0.0.1](https://github.com/hliutongco/stagedoor/releases/tag/v0.0.1) - 2024-12-11 00:02:30

This release includes basic setup for aligning the Neon branches with Github changes + Vercel deployments

### Bug Fixes

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

### Minor Changes

- github/workflows:
  - try adding database url env variable ([d7498a1](https://github.com/hliutongco/stagedoor/commit/d7498a1adce4848366dd6f2b80a8b6268c424f8b)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try removing pooler ([8fbe7d5](https://github.com/hliutongco/stagedoor/commit/8fbe7d5d3208f8215d72c6878756fa9b2b67770d)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try adding use server command ([d103355](https://github.com/hliutongco/stagedoor/commit/d1033559ae429d609e2e367d7ba83196518ae9b5)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try adding installation command ([df46f20](https://github.com/hliutongco/stagedoor/commit/df46f209c65f589a369d597d2ff38c149ec79945)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try moving dependencies ([151b5ee](https://github.com/hliutongco/stagedoor/commit/151b5eeb4068351a6d31d19189be83503d0f3a9d)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try moving dependencies ([db09d51](https://github.com/hliutongco/stagedoor/commit/db09d514631ae4b9e740030527311421777cb5b7)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))
  - try adding npx ([d0899eb](https://github.com/hliutongco/stagedoor/commit/d0899eb8405467e615be5679bce60bdde31d67c0)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))

- app:
  - test neon branch ([a467933](https://github.com/hliutongco/stagedoor/commit/a467933c4e1cae11bf775558f5ccd48fbe255c8d)) ([#1](https://github.com/hliutongco/stagedoor/pull/1))

\* *This CHANGELOG was automatically generated by [auto-generate-changelog](https://github.com/BobAnkh/auto-generate-changelog)*
