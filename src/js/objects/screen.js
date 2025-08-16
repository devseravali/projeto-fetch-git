const screen = {
    userProfile: document.querySelector('.profile-data'), 
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário">
                        <div class="data">
                          <h1>${user.name ?? 'Não possui nome cadastrado 😢' }</h1>
                          <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                          <p><strong>Seguidores:</strong> ${user.followers}</p>
                          <p><strong>Seguindo:</strong> ${user.following}</p>
                      </div>
                      </div>`

                let repositoriesItens = ''
                user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

                if(user.repositories.length > 0){
                    this.userProfile.innerHTML += `<div class="repositories section">
                                                        <h2>Repositórios</h2>
                                                        <ul>${repositoriesItens}</ul>
                                                    </div>`
                }

                this.renderEvents(user);
    }, 
    renderNotFound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    },
    renderEvents(user) {
        let events = '<ul>';
        user.events.slice(0, 10).forEach(event => {
            if(event.type === 'PushEvent' && event.payload && Array.isArray(event.payload.commits)) { let commitList = '<ul>';
                event.payload.commits.forEach(commit => {
                    commitList += `<li><h3><strong>Commit:</strong> ${commit.message}</h3></li>`;
                });
                commitList += '</ul>';
                events += `<li><h4><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a>${commitList}</h4></li>`;
            }
           

        }) 

        if (!user.events || !Array.isArray(user.events)) return;

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                         <h2>Commits</h2>
                                         <ul>${events}</ul>
                                     </div>`;
        }
    } 
}

export { screen }