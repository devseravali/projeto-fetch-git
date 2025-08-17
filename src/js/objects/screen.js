const screen = {
    userProfile: document.querySelector('.profile-data'),

    renderUser(user) {
       this.userProfile.innerHTML = `
<div class="info">
    <img src="${user.avatarUrl}" alt="Foto do perfil do usuário">
    <div class="data">
        <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
        <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
        <div class="stats">
            <p><i class="fa-solid fa-users"></i> <strong>Seguidores:</strong> ${user.followers}</p>
            <p><i class="fa-solid fa-user-plus"></i> <strong>Seguindo:</strong> ${user.following}</p>
        </div>

            <p><i class="fa-solid fa-code-fork"></i> <strong>Forks:</strong> ${user.forks}</p>
            <p><i class="fa-solid fa-star"></i> <strong>Estrelas:</strong> ${user.stars}</p>
            <p><i class="fa-solid fa-eye"></i> <strong>Watchers:</strong> ${user.watchers}</p>
            <p><i class="fa-solid fa-language"></i> <strong>Linguagens:</strong> ${user.languagesUrl}</p>
    </div>
</div>`;

        let repositoriesItens = '';
        (user.repositories || []).forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`);

        if (user.repositories && user.repositories.length > 0) {
            this.userProfile.innerHTML += `
                <div class="repositories section">
                    <h2>Repositórios</h2>
                    <ul>${repositoriesItens}</ul>
                </div>`;
        }

        this.renderEvents(user);
    },

    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`;
    },

    renderEvents(user) {
        if (!user.events || !Array.isArray(user.events) || user.events.length === 0) return;

        let events = '<ul>';
        user.events.slice(0, 10).forEach(event => {
            if (event.type === 'PushEvent' && event.payload && Array.isArray(event.payload.commits)) {
                let commitList = '<ul>';
                event.payload.commits.forEach(commit => {
                    commitList += `<li><h3><strong>Commit:</strong> ${commit.message}</h3></li>`;
                });
                commitList += '</ul>';
                events += `<li><h4><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a>${commitList}</h4></li>`;
            }
        });

        events += '</ul>';

        this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Commits</h2>
                ${events}
            </div>`;
    }
};

export { screen };
