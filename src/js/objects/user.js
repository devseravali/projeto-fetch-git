const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: 0,
    following: 0,
    repositories: [],
    forks: 0,
    stars: 0,
    watchers: 0,
    languagesUrl: '',
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url;
        this.name = gitHubUser.name;
        this.bio = gitHubUser.bio;
        this.userName = gitHubUser.login;
        this.followers = gitHubUser.followers;
        this.following = gitHubUser.following;
    }, 
    setRepositories(repositories){
        this.repositories = repositories || [];

        this.forks = this.repositories.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
        this.stars = this.repositories.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        this.watchers = this.repositories.reduce((acc, repo) => acc + (repo.watchers_count || 0), 0);

        const languages = Array.from(new Set(this.repositories.map(r => r.language).filter(Boolean)));
        this.languagesUrl = languages.length ? languages.join(', ') : '';
    }, 
    setEvents(events){
        this.events = events || [];
    }
}

export { user }