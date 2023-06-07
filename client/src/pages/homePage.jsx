import React from 'react';
import TopBar from './topBar/topBar';
import {
    StyledFooter,
    StyledPage,
    StyledHeader,
    StyledParagraph,
    StyledArticle
} from './homePage.styled';

export const HomePage = () => {

    return (
        <StyledPage>
            <TopBar />
            <StyledHeader>
                <StyledArticle>
                    <StyledParagraph>
                        <u>Give a Go</u>  .היא פלטפורמה למשלוחים שנועדה לסייע לעסקים למסור את המשלוחים שלהם בצורה יעילה ונכונה ללקוחותיהם.
                    </StyledParagraph>
                    <StyledParagraph>
                        באמצעות האתר שלנו, ניתן לקלוט פניות למשלוח ולהבטיח משלוח מהיר ונוח ללקוחות.
                        הפתרון המושלם לעסקים שרוצים לספק משלוחים ללקוחותיהם בצורה יעילה ומסודרת.
                    </StyledParagraph>
                </StyledArticle>
            </StyledHeader>
            <StyledFooter>זכויות יוצרים © 2023 ChenWave R&D. כל הזכויות שמורות</StyledFooter>
        </StyledPage>

    );
}