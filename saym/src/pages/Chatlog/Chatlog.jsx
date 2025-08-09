import * as S from './ChatlogStyle';
import SubHeader from '../../components/SubHeader/SubHeader';
import ThumbnailImage from '../../assets/img/chatlog_img.png'; // 임의 이미지
import { useNavigate } from 'react-router-dom';

const dummyChatlogs = [
   {
      id: 1,
      title: '어쩌구 저쩌구 기획을 했는데 평가해줘',
      date: '2025/07/31',
      thumbnail: ThumbnailImage,
   },
   {
      id: 2,
      title: '새로운 이벤트 아이디어 좀 봐주세요',
      date: '2025/07/28',
      thumbnail: ThumbnailImage,
   },
   {
      id: 3,
      title: '어쩌구 저쩌구 기획을 했는데 평가해줘',
      date: '2025/07/31',
      thumbnail: ThumbnailImage,
   },
   {
      id: 4,
      title: '새로운 이벤트 아이디어 좀 봐주세요',
      date: '2025/07/28',
      thumbnail: ThumbnailImage,
   },
   {
      id: 5,
      title: '어쩌구 저쩌구 기획을 했는데 평가해줘',
      date: '2025/07/31',
      thumbnail: ThumbnailImage,
   },
   {
      id: 6,
      title: '새로운 이벤트 아이디어 좀 봐주세요',
      date: '2025/07/28',
      thumbnail: ThumbnailImage,
   },
   {
      id: 7,
      title: '어쩌구 저쩌구 기획을 했는데 평가해줘',
      date: '2025/07/31',
      thumbnail: ThumbnailImage,
   },
   {
      id: 8,
      title: '새로운 이벤트 아이디어 좀 봐주세요',
      date: '2025/07/28',
      thumbnail: ThumbnailImage,
   },
   {
      id: 9,
      title: '어쩌구 저쩌구 기획을 했는데 평가해줘',
      date: '2025/07/31',
      thumbnail: ThumbnailImage,
   },
   {
      id: 10,
      title: '새로운 이벤트 아이디어 좀 봐주세요',
      date: '2025/07/28',
      thumbnail: ThumbnailImage,
   },
];

const Chatlog = () => {
   const navigate = useNavigate();
   return (
      <>
         <S.ChatlogContainer>
            <SubHeader title="기록" />
            <S.LogList>
               {dummyChatlogs.map((log) => (
                  <S.LogItem
                     key={log.id}
                     onClick={() => navigate(`/airesult/${log.id}`)}
                  >
                     <S.Thumbnail src={log.thumbnail} alt="기획안 이미지" />
                     <S.InfoWrapper>
                        <S.Title>{log.title}</S.Title>
                        <S.Date>{log.date}</S.Date>
                     </S.InfoWrapper>
                  </S.LogItem>
               ))}
            </S.LogList>
         </S.ChatlogContainer>
      </>
   );
};

export default Chatlog;
