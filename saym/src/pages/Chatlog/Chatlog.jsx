import { useEffect, useState } from 'react';
import * as S from './ChatlogStyle';
import SubHeader from '../../components/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import LoadingPage from '../../components/Loading/Loding';

const Chatlog = () => {
   const navigate = useNavigate();
   const [chatlogs, setChatlogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [imagesLoaded, setImagesLoaded] = useState(false);

   useEffect(() => {
      const fetchChatlogs = async () => {
         try {
            const res = await axiosInstance.get('/api/v1/ai/all-record');

            const formattedData = res.data.map((item) => ({
               id: item.aiId,
               title: item.chatContent,
               date: new Date(item.chatDate).toLocaleDateString('ko-KR'),
               thumbnail: item.imageUrl || '/default-thumbnail.png',
            }));

            setChatlogs(formattedData);

            const imagePromises = formattedData.map(
               (item) =>
                  new Promise((resolve) => {
                     const img = new Image();
                     img.src = item.thumbnail;
                     img.onload = resolve;
                     img.onerror = resolve;
                  }),
            );

            await Promise.all(imagePromises);
            setImagesLoaded(true);
         } catch (err) {
            console.error('기록 불러오기 실패:', err);
            setError('기록을 불러오는 중 오류가 발생했습니다.');
         }
      };

      fetchChatlogs();
   }, []);

   useEffect(() => {
      if (imagesLoaded || error) {
         const timer = setTimeout(() => setLoading(false), 2000);
         return () => clearTimeout(timer);
      }
   }, [imagesLoaded, error]);

   if (loading) return <LoadingPage />;
   if (error) return <div>{error}</div>;

   return (
      <S.ChatlogContainer>
         <SubHeader title="기록" />
         <S.LogList>
            {chatlogs.map((log) => (
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
   );
};

export default Chatlog;
