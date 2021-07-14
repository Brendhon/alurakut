import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';
import { ProfileRelationsBox } from '../src/components/ProfileRelations';
import ProfileSidebar from '../src/components/ProfileSidebar';

export default function Home() {
  const [followers, setFollowers] = React.useState([]);
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
    { id: '438358u', name: 'ItaloRez', image: 'https://github.com/ItaloRez.png' },
    { id: '324234', name: 'GabrielGSD', image: 'https://github.com/GabrielGSD.png' },
    { id: '34521', name: 'VanessaSwerts', image: 'https://github.com/VanessaSwerts.png' },
    { id: '435464', name: 'itmoura', image: 'https://github.com/itmoura.png' },
    { id: '123134545', name: 'Leo18ss', image: 'https://github.com/Leo18ss.png' },
    { id: '1312323', name: 'alexanderaugusto', image: 'https://github.com/alexanderaugusto.png' },
  ];

  React.useEffect(() => {
    // Buscando dados dos seguidores
    fetch('https://api.github.com/users/brendhon/followers')
      .then((resp) => resp.json())
      .then((resp) => setFollowers(resp));
  }, []);

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
                  type="text"
                />
              </div>

              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>

        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBox
            title="Seguidores"
            items={followers}
            attrName="login"
            attrImage="avatar_url"
            link="https://github.com/"
          />

          <ProfileRelationsBox
            title="Comunidades"
            items={comunidades}
            attrName="title"
            attrImage="image"
            link="/users/"
          />

          <ProfileRelationsBox
            title="Pessoas da comunidade"
            items={pessoasFavoritas}
            attrName="name"
            attrImage="image"
            link="/users/"
          />
        </div>
      </MainGrid>
    </>
  );
}
