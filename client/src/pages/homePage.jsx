import React from 'react';
import TopBar from './topBar/topBar';
import {
    StyledFooter,
    StyledPage,
    StyledHeader,
    StyledParagraph,
    StyledArticle,
} from './homePage.styled';
import HomeChart from './pagesHelper/homeChart';

export const HomePage = () => {

    return (
        <StyledPage>
            <TopBar />
            <StyledHeader>
                <StyledArticle>
                    <StyledParagraph>
                        פלטפורמה למשלוחים שנועדה לסייע לעסקים למסור את המשלוחים שלהם בצורה יעילה ונכונה ללקוחותיהם.
                    </StyledParagraph>
                    <StyledParagraph>
                        באמצעות האתר שלנו, ניתן לקלוט פניות למשלוח ולהבטיח משלוח מהיר ונוח ללקוחות.
                        הפתרון המושלם לעסקים שרוצים לספק משלוחים ללקוחותיהם בצורה יעילה ומסודרת.
                    </StyledParagraph>
                </StyledArticle>
                    <HomeChart />
            </StyledHeader>
            <StyledFooter>זכויות יוצרים © 2023 ItamarChen. כל הזכויות שמורות</StyledFooter>
        </StyledPage>
    );
};