# 순찰의 새로운 기준이 되다, NURINOON

## 💡 프로젝트 소개
경찰은 치안 관리를 위해 도보 순찰을 강화하고 있으나, 인력 중심 순찰의 한계, 긴급 상황 대응 지체, 신고 의존형 사후 대응 시스템(신고가 없는 사건에 대한 대응 불가) 등의 문제점을 안고 있습니다. 우리는 이러한 문제에 주목하여, AI를 통해 위험 행동을 실시간으로 탐지·분류하고 사건을 즉시 관리할 수 있는 모니터링 시스템, NURINOON(누리눈)을 개발하였습니다.

NURINOON은 CCTV 영상을 실시간 분석하여 화재, 폭행, 쓰러짐(실신) 등 다양한 위험 상황을 감지하고 사건 유형별로 우선순위를 지정해 경찰의 신속한 대응을 지원합니다. 실시간 스트리밍 기능을 통해 관할 지역 CCTV를 모니터링하며 현장 상황을 즉각적으로 파악할 수 있습니다. 또한 발생한 사건 데이터를 기반으로 경향을 분석하고 시각화하여 순찰 인력 배치 등 치안 전략 수립을 지원합니다.

NURINOON은 상시 모니터링을 통해 인력 부담을 줄이고, AI를 활용해 보다 빠른 대응을 가능하게 함으로써 인력 운영의 효율성을 극대화하는 것을 목표로 합니다. 궁극적으로 긴급 상황을 빠르게 인식하고 선제적으로 대응함으로써 공공 안전을 꾸준히 높이는 것을 목표로 합니다.

<br/>
<br/>
<br/>


## 💡기능 및 특징 소개
![서비스 흐름](https://github.com/user-attachments/assets/d2920144-1bc5-452c-9cac-26ff910ae1e5)


<br><br>
NURINOON의 사용 흐름은 다음과 같습니다.
1. CCTV 영상이 실시간으로 송출됨과 동시에 AI 모델에 전달되어 위험 행동을 탐지합니다.
2. 위험 행동이 감지되면 실시간으로 알림이 전송되고, 경찰은 상황을 확인한 후 적절한 대응을 선택하게 됩니다. 이때 출동과 미출동 2가지 대응 방안이 존재합니다.
4. 일련의 대응 과정이 모두 끝나면, 해당 사건은 종료 처리되며, 종료된 사건은 누적되어 추후 조회 및 통계 자료로 활용됩니다.
<br><br><br><br>

### 👁️‍🗨️ AI 기반 실시간 위험 행동 감지

AI를 통해 CCTV 데이터를 실시간으로 분석해 위험 행동을 감지합니다. 폭행, 실신, 흉기난동, 화재, 군중밀집 등 다양한 위험 행동을 감지할 수 있습니다.
<br><br>

### 🚨 위험 행동 분류 및 알림

위험도에 따라 단계를 구분하여 위험 행동 감지 알림을 전송합니다. 1단계 위험은 푸쉬 알림으로, 2단계 위험은 모달창을 통해 위험 상황을 알립니다. 경찰은 상황에 따라 우선순위가 높은 사건부터 해결할 수 있습니다.
<br><br>

### 🚔 출동중인 사건 관리

경찰은 출동중인 사건을 모아서 관리하고 확인할 수 있습니다. 사건 발생 시각, 위치 등의 정보를 제공하며 '영상 확인' 버튼을 통해 위험 행동이 감지된 CCTV 화면을 다시 확인할 수 있습니다.
<br><br>

### 👍 AI 성능 개선을 위한 사건 유형 피드백

사건 종료 시 사건 발생 유무, 위험 유형 매칭률 등을 선택하여 사건 유형 피드백을 진행합니다. 피드백이 반영된 데이터를 재학습시켜 오탐률을 줄이고 정확도를 높일 수 있습니다.
<br><br>

### 📝 사건 기록 조회

경찰이 종결된 사건을 모아서 확인할 수 있도록 '사건 기록 조회' 기능을 제공합니다. 필터링 및 검색 기능으로 원하는 사건을 쉽게 찾을 수 있습니다.
<br><br>

### 📊 통계 차트 제공

누적된 사건 데이터를 기반으로 시간대별, 장소별, 유형별 등 다양한 통계 그래프를 제공합니다. 경찰은 그래프를 통해 사건 경향성을 파악할 수 있으며, 지도의 클러스터링 기능을 통해 사건 다발 지역을 쉽게 인식할 수 있습니다.
<br><br>

<br/>
<br/>
<br/>



## 페이지 소개

| 기능 | 시연 화면 |
|:------:|:--------:|
| **구글 로그인 및 사용자 음성 데이터 수집** | <img src="./resources/feature_1.gif" width="400"/> |
| **예시 대본 제공 및 사용자 대본 생성** | <img src="./resources/feature_2.gif" width="400"/> |
| **문장 단위 연습** | <img src="./resources/feature_3.gif" width="400"/> |
| **프롬프트 연습** | <img src="./resources/feature_4.gif" width="400"/> |
| **연습 기록 확인** | <img src="./resources/feature_5.gif" width="400"/> |

<br/>
<br/>
<br/>


## 시연 영상

{% include youtube.html id="n0foeiRzmUE" %}


<br/>
<br/>
<br/>



## 시스템 아키텍처
---

![시스템아키텍처](https://github.com/user-attachments/assets/7c5cd308-86a6-4bc7-963a-f18b51338ef4)


<br/>
<br/>
<br/>



## Model
내용을 추가해주세요

<br/>
<br/>
<br/>




## 팀원

<table>
    <tr align="center">
      <td style="min-width: 100px;">
            <a href="https://github.com/hummingbbird">
              <img src="https://github.com/hummingbbird.png" width="100" alt="프로필사진">
              <br />
              <b>이채영</b>
            </a>
        </td>
      <td style="min-width: 100px;">
            <a href="https://github.com/seo0o519">
              <img src="https://github.com/seo0o519.png" width="100" alt="프로필사진">
              <br />
              <b>강서영</b>
            </a>
        </td>
      <td style="min-width: 100px;">
            <a href="https://github.com/HeeNamgoong">
              <img src="https://github.com/HeeNamgoong.png" width="100" alt="프로필사진">
              <br />
              <b>남궁희</b>
            </a>
        </td>
      <td style="min-width: 100px;">
            <a href="https://github.com/hyni03">
              <img src="https://github.com/hyni03.png" width="100" alt="프로필사진">
              <br />
              <b>김은지</b>
            </a>
        </td>
        <td style="min-width: 100px;">
            <a href="https://github.com/mjk25">
              <img src="https://github.com/mjk25.png" width="100" alt="프로필사진">
              <br />
              <b>김민주</b>
            </a>
        </td>
        <td style="min-width: 100px;">
            <a href="https://github.com/justpers">
              <img src="https://github.com/justpers.png" width="100" alt="프로필사진">
              <br />
              <b>김예향</b>
            </a>
        </td>
    </tr>
    <tr align="center">
      <td>
            TL, Frontend <br/>
      </td>
       <td>
            Frontend <br/>
      </td>
       <td>
            Frontend<br/>
      </td>
      <td>
            Backend <br/>
      </td>
      <td>
            Backend <br/>
      </td>
      <td>
            AI <br/>
      </td>
    </tr>
</table>
<br><br>


## 기술 스택

### 💄 Frontend

| 역할                     | 종류                                                                                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Library**              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)                                                                                                                        |
| **Programming Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                         |
| **UI Component Library** | ![MUI](https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=MUI&logoColor=white)                                                                                                                              |
| **Styling**              | ![styled-components](https://img.shields.io/badge/styled_components-DB7093.svg?style=for-the-badge&logo=styledcomponents&logoColor=white)                                                                                 |
| **Formatting**           | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=white) |
| **Package Manager**      | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB.svg?style=for-the-badge&logo=Yarn&logoColor=white)                                                                                                                       |
| **Deployment**           | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                     |

<br />

### 🚀 Backend

| 역할                     | 종류                                                                                                                                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Programming Language** | ![JAVA](https://img.shields.io/badge/JAVA-004027?style=for-the-badge&logo=Jameson&logoColor=white)                                                                                                               |
| **Framework**            | ![SpringBoot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white)                                                                                               |
| **Build Tool**           | ![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white)                                                                                                            |
| **API**                  | ![Rest](https://img.shields.io/badge/Rest_API-000000?style=for-the-badge&logo=iRobot&logoColor=white)                                                                                                            |
| **Database**             | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)                                                                                                |
| **Storage**              | ![AWS_S3](https://img.shields.io/badge/aws_s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)                                                                                                          |
| **Message Queue**        | ![ApacheKafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=ApacheKafka&logoColor=white)                                                                                            |
| **Deployment**           | ![aws ec2](https://img.shields.io/badge/aws_ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white) ![docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) |
| **CI/CD**                | ![github actions](https://img.shields.io/badge/Github_actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)                                                                                     |

<br />

### 🤖 AI Server

| 역할                     | 종류                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| **Programming Language** | ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) |
| **Framework**            |

<br />                                    
<br/><br/><br/>

## 제출 서류
---

-
-
-