export class PublicRoutes {
  constructor(private readonly locale: string) {}

  getRoutes() {
    return {
      LOGIN: `/${this.locale}/auth/login`,
      REGISTER: `/${this.locale}/auth/register`,
      HOME: `/${this.locale}`,
    } as const;
  }
}
