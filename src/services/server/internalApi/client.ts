const removeLeadingSlash = (endpoint: string = '') => {
  return endpoint[0] === '/' ? endpoint.slice(1) : endpoint;
};

class InternalApiClient {
  route: string;

  constructor(route: string) {
    const withoutLeading = removeLeadingSlash(route);
    this.route = `${process.env['ROOT_URL']}/api/_/${withoutLeading}`;
  }

  async post<Input, Output>(input: Input) {
    console.log(this.route);

    const res = await fetch(this.route, {
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env['CRON_SECRET']}`,
      },
      method: 'POST',
    });

    if (!res.ok) throw new Error('Failed to post internal api');

    const body = (await res.json()) as Output;

    return body;
  }
}

export default InternalApiClient;
