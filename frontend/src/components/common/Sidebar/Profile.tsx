import * as S from './Sidebar.style';

interface ProfileProps {
  imgUrl?: string;
  name?: string;
  level?: string;
  territory?: string;
}

const Profile = ({ imgUrl, name, level, territory }: ProfileProps) => {
  return (
    <S.ProfileLayout>
      <div className="avartar">
        <S.ProfileAvatar alt="police avatar" src={imgUrl} />
      </div>
      <S.InfoDiv>
        <div>
          <S.InfoText type="name">{name}</S.InfoText>
          <S.InfoText type="level">{level}</S.InfoText>
        </div>
        <S.InfoText type="territory">{territory}</S.InfoText>
      </S.InfoDiv>
    </S.ProfileLayout>
  );
};

export default Profile;
