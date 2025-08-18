import { useEffect, useState } from 'react';
import * as S from './ChatlogStyle';
import SubHeader from '../../components/SubHeader/SubHeader';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const Chatlog = () => {
   const navigate = useNavigate();
   const [chatlogs, setChatlogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

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
         } catch (err) {
            console.error('기록 불러오기 실패:', err);
            setError('기록을 불러오는 중 오류가 발생했습니다.');
         } finally {
            setLoading(false);
         }
      };

      fetchChatlogs();
   }, []);

   if (loading) return <div>불러오는 중...</div>;
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
