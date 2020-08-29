export const getSimpleData = (data) => {
  if (data.type === 'github') {
    const repository = `https://github.com/${data.repository}`;
    const issue = {
      url: `${repository}/issues`,
    };
    const { translation, license } = data;
    return {
      repository, issue, translation, license,
    };
  }
};

export const getFullData = async (data) => {
  if (data.type === 'github') {
    const api = await (
      await fetch(`https://api.github.com/repos/${data.repository}`)
    ).json();
    const repository = `https://github.com/${data.repository}`;
    const issue = {
      url: `${repository}/issues`,
      countOpen: api.open_issues_count,
    };
    const stats = {
      star: {
        count: api.stargazers_count,
        url: api.stargazers_url,
      },
      fork: {
        count: api.forks_count,
        url: api.forks_url,
      },
    };
    const { translation, license } = data;
    return {
      repository, issue, translation, stats,
      license: license || (api.license && api.license.spdx_id || 'NOASSERTION'),
    };
  }
};
