import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  const { user } = props;
  return (
    <Box as="aside">
      <img
        alt="User"
        src={`https://github.com/${user}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @
          {user}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'brendhon';
  const [comunidades, setComunidades] = React.useState([
    {
      id: '34895938045834058',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    },
    {
      id: '3489593803145834058',
      title: 'Queria sorvete, mas era feijão',
      image: 'http://2.bp.blogspot.com/-WDodYsXnKCI/UDU-qfKhhkI/AAAAAAAAFyw/1_hjppmxWx4/s320/2012-08-22+21.44.07.jpg',
    },
    {
      id: '348959380314583a4058',
      title: 'Amo paisagens',
      image: 'https://picsum.photos/200/200',
    },
  ]);
  const pessoasFavoritas = [
    'ItaloRez',
    'GabrielGSD',
    'VanessaSwerts',
    'itmoura',
    'Leo18ss',
    'alexanderaugusto',
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar user={githubUser} />
        </div>

        <div className="welcomeArea">
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const formData = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(), // Criando array de forma aleatória
                title: formData.get('title'),
                image: formData.get('image'),
              };
              if (comunidade.image && comunidades.length < 6) {
                setComunidades([...comunidades, comunidade]);
              }
            }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>

        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades (
              {comunidades.length}
              )
            </h2>
            <ul>
              {comunidades.map((itemAtual) => (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img alt="Community" src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade (
              {pessoasFavoritas.length}
              )
            </h2>

            <ul>
              {pessoasFavoritas.map((person) => (
                <li key={person}>
                  <a href={`/users/${person}`}>
                    <img alt={`Usuário ${person}`} src={`https://github.com/${person}.png`} />
                    <span>{person}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
