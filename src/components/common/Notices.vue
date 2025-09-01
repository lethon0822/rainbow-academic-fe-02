<script setup>
import { onMounted, ref, computed, watch } from "vue";

// 공지사항 관리
const notices = ref([
  {
    id: 1,
    title: "2025년 시스템 정기 점검 안내",
    date: "2025-07-28",
    isImportant: true,
    content:
      "안정적인 서비스 제공을 위해 시스템 정기 점검을 실시합니다.\n\n점검 일시: 2025년 8월 1일 02:00 ~ 06:00 (4시간)\n점검 내용:\n- 서버 안정성 개선\n- 보안 패치 적용\n- 데이터베이스 최적화\n\n점검 중에는 일시적으로 서비스 이용이 제한될 수 있습니다.\n이용에 불편을 드려 죄송합니다.",
    views: 245,
    author: "관리자",
  },
  {
    id: 2,
    title: "새로운 기능 업데이트 - 다크모드 지원",
    date: "2025-07-27",
    isImportant: false,
    content:
      "사용자 편의성 향상을 위해 다크모드 기능이 추가되었습니다.\n\n주요 변경사항:\n- 다크모드/라이트모드 전환 가능\n- 사용자 설정에 따른 자동 테마 적용\n- 모든 페이지에서 일관된 디자인 제공\n\n설정 > 화면 설정에서 변경하실 수 있습니다.",
    views: 189,
    author: "개발팀",
  },
  {
    id: 3,
    title: "[중요] 개인정보 처리방침 변경 안내",
    date: "2025-07-25",
    isImportant: true,
    content:
      "개인정보 보호법 개정에 따른 처리방침 변경사항을 안내드립니다.\n\n주요 변경사항:\n- 개인정보 수집 및 이용 목적 명확화\n- 개인정보 보유 및 이용기간 조정\n- 개인정보 처리 위탁 관련 사항 추가\n\n자세한 내용은 개인정보 처리방침 페이지를 확인해주세요.",
    views: 567,
    author: "법무팀",
  },
  {
    id: 4,
    title: "서비스 이용약관 개정 안내",
    date: "2025-07-20",
    isImportant: false,
    content:
      "서비스 품질 향상을 위한 이용약관 일부 개정 사항입니다.\n\n개정 내용:\n- 서비스 이용 범위 명확화\n- 사용자 의무사항 추가\n- 서비스 중단 관련 조항 개선\n\n개정된 약관은 2025년 8월 1일부터 적용됩니다.",
    views: 123,
    author: "운영팀",
  },
  {
    id: 5,
    title: "고객센터 운영시간 변경 안내",
    date: "2025-07-18",
    isImportant: false,
    content:
      "고객센터 운영시간이 변경되오니 참고 부탁드립니다.\n\n변경 전: 평일 09:00 ~ 18:00\n변경 후: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n일요일 및 공휴일은 휴무입니다.\n긴급 문의는 온라인 채팅을 이용해주세요.",
    views: 89,
    author: "고객지원팀",
  },
  {
    id: 6,
    title: "고객센터 운영시간 변경 안내",
    date: "2025-07-18",
    isImportant: false,
    content:
      "고객센터 운영시간이 변경되오니 참고 부탁드립니다.\n\n변경 전: 평일 09:00 ~ 18:00\n변경 후: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n일요일 및 공휴일은 휴무입니다.\n긴급 문의는 온라인 채팅을 이용해주세요.",
    views: 89,
    author: "고객지원팀",
  },
  {
    id: 7,
    title: "고객센터 운영시간 변경 안내",
    date: "2025-07-18",
    isImportant: false,
    content:
      "고객센터 운영시간이 변경되오니 참고 부탁드립니다.\n\n변경 전: 평일 09:00 ~ 18:00\n변경 후: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n일요일 및 공휴일은 휴무입니다.\n긴급 문의는 온라인 채팅을 이용해주세요.",
    views: 89,
    author: "고객지원팀",
  },
  {
    id: 8,
    title: "고객센터 운영시간 변경 안내",
    date: "2025-07-18",
    isImportant: false,
    content:
      "고객센터 운영시간이 변경되오니 참고 부탁드립니다.\n\n변경 전: 평일 09:00 ~ 18:00\n변경 후: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n일요일 및 공휴일은 휴무입니다.\n긴급 문의는 온라인 채팅을 이용해주세요.",
    views: 89,
    author: "고객지원팀",
  },
  {
    id: 9,
    title: "고객센터 운영시간 변경 안내",
    date: "2025-07-18",
    isImportant: false,
    content:
      "고객센터 운영시간이 변경되오니 참고 부탁드립니다.\n\n변경 전: 평일 09:00 ~ 18:00\n변경 후: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n일요일 및 공휴일은 휴무입니다.\n긴급 문의는 온라인 채팅을 이용해주세요.",
    views: 89,
    author: "고객지원팀",
  },
  {
    id: 10,
    title: "고객센터 운영시간 변경 안내",
    date: "2025-07-18",
    isImportant: false,
    content:
      "고객센터 운영시간이 변경되오니 참고 부탁드립니다.\n\n변경 전: 평일 09:00 ~ 18:00\n변경 후: 평일 09:00 ~ 19:00, 토요일 10:00 ~ 16:00\n\n일요일 및 공휴일은 휴무입니다.\n긴급 문의는 온라인 채팅을 이용해주세요.",
    views: 89,
    author: "고객지원팀",
  },
]);

// 검색 및 필터링
const searchKeyword = ref("");
const filterType = ref("all"); // all, important, normal

// 필터링된 공지사항
const filteredNotices = computed(() => {
  let filtered = notices.value;

  // 검색 필터
  if (searchKeyword.value.trim()) {
    filtered = filtered.filter(
      (notice) =>
        notice.title
          .toLowerCase()
          .includes(searchKeyword.value.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  }

  // 중요도 필터
  if (filterType.value === "important") {
    filtered = filtered.filter((notice) => notice.isImportant);
  } else if (filterType.value === "normal") {
    filtered = filtered.filter((notice) => !notice.isImportant);
  }

  return filtered;
});

// 페이지네이션
const currentPage = ref(1);
const itemsPerPage = 5;
const totalPages = computed(() =>
  Math.ceil(filteredNotices.value.length / itemsPerPage)
);
const paginatedNotices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNotices.value.slice(start, end);
});

// 모달 및 폼 상태
const showModal = ref(false);
const showDetailModal = ref(false);
const editMode = ref(false);
const selectedNotice = ref(null);
const nextId = ref(6);

// 폼 데이터
const form = ref({
  title: "",
  content: "",
  isImportant: false,
  author: "관리자",
});

// 상세보기
const viewNotice = (notice) => {
  selectedNotice.value = { ...notice };
  // 조회수 증가
  const originalNotice = notices.value.find((n) => n.id === notice.id);
  if (originalNotice) {
    originalNotice.views += 1;
  }
  showDetailModal.value = true;
};

// 새 글 작성 모달 열기
const openWriteModal = () => {
  form.value = {
    title: "",
    content: "",
    isImportant: false,
    author: "관리자",
  };
  editMode.value = false;
  showModal.value = true;
};

// 수정 모달 열기
const openEditModal = (notice) => {
  form.value = {
    title: notice.title,
    content: notice.content,
    isImportant: notice.isImportant,
    author: notice.author || "관리자",
  };
  selectedNotice.value = notice;
  editMode.value = true;
  showDetailModal.value = false; // 상세보기 모달 닫기
  showModal.value = true;
};

// 저장 (생성/수정)
const saveNotice = () => {
  if (!form.value.title.trim() || !form.value.content.trim()) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  if (editMode.value) {
    // 수정
    const index = notices.value.findIndex(
      (n) => n.id === selectedNotice.value.id
    );
    if (index !== -1) {
      notices.value[index] = {
        ...notices.value[index],
        title: form.value.title,
        content: form.value.content,
        isImportant: form.value.isImportant,
        author: form.value.author,
      };
    }
  } else {
    // 새 글 작성
    const newNotice = {
      id: nextId.value++,
      title: form.value.title,
      content: form.value.content,
      isImportant: form.value.isImportant,
      date: new Date().toISOString().split("T")[0],
      views: 0,
      author: form.value.author,
    };
    notices.value.unshift(newNotice);
  }

  closeModal();
  alert(editMode.value ? "수정되었습니다." : "작성되었습니다.");
};

// 삭제
const deleteNotice = (noticeId) => {
  if (confirm("정말 삭제하시겠습니까?")) {
    notices.value = notices.value.filter((n) => n.id !== noticeId);
    if (showDetailModal.value && selectedNotice.value?.id === noticeId) {
      showDetailModal.value = false;
    }
    alert("삭제되었습니다.");
  }
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
  showDetailModal.value = false;
  selectedNotice.value = null;
  form.value = {
    title: "",
    content: "",
    isImportant: false,
    author: "관리자",
  };
};

// 페이지 변경
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 검색 및 필터 초기화
const resetFilters = () => {
  searchKeyword.value = "";
  filterType.value = "all";
  currentPage.value = 1;
};

// 검색/필터 변경시 페이지 초기화
watch([searchKeyword, filterType], () => {
  currentPage.value = 1;
});

onMounted(() => {
  // 초기 로딩 작업
});
</script>

<template>
  <div class="notices">
    <!-- 공지사항 내용 -->
    <div class="notice-page">
      <!-- 메인 컨텐츠 -->
      <main class="main-content">
        <div class="content-container">
          <!-- 페이지 제목 -->
          <div class="page-title-section">
            <h1 class="page-title">공지사항</h1>
            <p class="page-description">중요한 소식과 업데이트를 확인하세요</p>
          </div>

          <!-- 검색 및 필터 영역 -->
          <div class="search-filter-section">
            <div class="search-area">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="제목 또는 내용으로 검색..."
                class="search-input"
              />
              <button class="search-btn">🔍</button>
            </div>

            <div class="filter-area">
              <select v-model="filterType" class="filter-select">
                <option value="all">전체</option>
                <option value="important">중요 공지</option>
                <option value="normal">일반 공지</option>
              </select>
              <button class="reset-btn" @click="resetFilters">초기화</button>
              <button class="write-btn" @click="openWriteModal">글쓰기</button>
            </div>
          </div>

          <!-- 공지사항 목록 -->
          <div class="notice-board">
            <div class="notice-table">
              <div class="table-header">
                <span class="col-num">번호</span>
                <span class="col-title">제목</span>
                <span class="col-author">작성자</span>
                <span class="col-date">등록일</span>
                <span class="col-views">조회</span>
                <span class="col-actions">관리</span>
              </div>

              <div class="table-body">
                <div
                  v-for="(notice, index) in paginatedNotices"
                  :key="notice.id"
                  class="table-row"
                  :class="{ important: notice.isImportant }"
                >
                  <span class="col-num">{{
                    filteredNotices.length -
                    ((currentPage - 1) * itemsPerPage + index)
                  }}</span>
                  <div class="col-title" @click="viewNotice(notice)">
                    <span v-if="notice.isImportant" class="important-badge"
                      >중요</span
                    >
                    <span class="notice-text">{{ notice.title }}</span>
                  </div>
                  <span class="col-author">{{ notice.author }}</span>
                  <span class="col-date">{{ notice.date }}</span>
                  <span class="col-views">{{ notice.views }}</span>
                  <div class="col-actions">
                    <button
                      class="action-btn edit-btn"
                      @click="openEditModal(notice)"
                    >
                      수정
                    </button>
                    <button
                      class="action-btn delete-btn"
                      @click="deleteNotice(notice.id)"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <!-- 빈 상태 -->
                <div v-if="paginatedNotices.length === 0" class="empty-state">
                  <p>
                    {{
                      searchKeyword
                        ? "검색 결과가 없습니다."
                        : "등록된 공지사항이 없습니다."
                    }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 페이지네이션 -->
            <div class="pagination-section" v-if="totalPages > 1">
              <div class="pagination">
                <button
                  class="page-btn"
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 1"
                >
                  ‹
                </button>

                <button
                  v-for="page in Math.min(totalPages, 5)"
                  :key="page"
                  class="page-btn"
                  :class="{ active: currentPage === page }"
                  @click="changePage(page)"
                >
                  {{ page }}
                </button>

                <button
                  class="page-btn"
                  @click="changePage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 글쓰기/수정 모달 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content write-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ editMode ? "공지사항 수정" : "새 공지사항 작성" }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>작성자</label>
              <input
                v-model="form.author"
                type="text"
                placeholder="작성자명을 입력하세요"
                class="form-input"
              />
            </div>
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input
                  v-model="form.isImportant"
                  type="checkbox"
                  class="form-checkbox"
                />
                중요 공지사항
              </label>
            </div>
          </div>

          <div class="form-group">
            <label>제목</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="제목을 입력하세요"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>내용</label>
            <textarea
              v-model="form.content"
              placeholder="내용을 입력하세요"
              class="form-textarea"
              rows="12"
            ></textarea>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">취소</button>
          <button class="btn btn-primary" @click="saveNotice">
            {{ editMode ? "수정 완료" : "작성 완료" }}
          </button>
        </div>
      </div>
    </div>

    <!-- 상세보기 모달 -->
    <div v-if="showDetailModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content detail-modal" @click.stop>
        <div class="modal-header">
          <div class="detail-title-area">
            <span v-if="selectedNotice?.isImportant" class="important-badge"
              >중요</span
            >
            <h3>{{ selectedNotice?.title }}</h3>
          </div>
          <button class="close-btn" @click="closeModal">×</button>
        </div>

        <div class="modal-body">
          <div class="detail-meta">
            <div class="meta-row">
              <span class="meta-label">작성자:</span>
              <span>{{ selectedNotice?.author }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">작성일:</span>
              <span>{{ selectedNotice?.date }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">조회수:</span>
              <span>{{ selectedNotice?.views }}</span>
            </div>
          </div>
          <div class="detail-content">
            {{ selectedNotice?.content }}
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">닫기</button>
          <div class="detail-actions">
            <button
              class="btn btn-primary"
              @click="openEditModal(selectedNotice)"
            >
              수정
            </button>
            <button
              class="btn btn-danger"
              @click="deleteNotice(selectedNotice.id)"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notices {
  position: fixed;
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.notice-page {
  min-height: 100vh;
}

/* 메인 컨텐츠 */
.main-content {
  padding: 40px 20px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title-section {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px 0;
}

.page-description {
  font-size: 16px;
  color: #666;
  margin: 0;
}

/* 검색 및 필터 */
.search-filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search-area {
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 50px 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #007bff;
}

.search-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.filter-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.reset-btn {
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-btn:hover {
  background: #545b62;
}

.write-btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.write-btn:hover {
  background: #0056b3;
}

/* 공지사항 보드 */
.notice-board {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.board-header {
  padding: 20px;
  border-bottom: 1px solid #ced4da;
  background: #fff;
}

.total-count {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.notice-table {
  width: 100%;
}

.table-header {
  display: grid;
  grid-template-columns: 60px 1fr 100px 100px 60px 120px;
  gap: 15px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 3px solid #e9ecef;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
}

.table-row {
  display: grid;
  grid-template-columns: 60px 1fr 100px 100px 60px 120px;
  gap: 15px;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #e9ecef;
}

.table-row.important {
  background-color: #fff8f0;
}

.table-row.important:hover {
  background-color: #ffefd6;
}

.col-num {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.col-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 0;
}

.col-title:hover .notice-text {
  color: #007bff;
  text-decoration: underline;
}

.important-badge {
  background: #ff4757;
  color: white;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 8px;
  font-weight: 500;
  flex-shrink: 0;
}

.notice-text {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-author {
  text-align: center;
  color: #666;
  font-size: 13px;
}

.col-date {
  text-align: center;
  color: #999;
  font-size: 13px;
}

.col-views {
  text-align: center;
  color: #666;
  font-size: 13px;
}

.col-actions {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.edit-btn {
  background: #28a745;
  color: white;
}

.edit-btn:hover {
  background: #218838;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: #999;
  font-size: 16px;
}

/* 페이지네이션 */
.pagination-section {
  padding: 30px 20px;
  background: #fff;
  border-top: 1px solid #e9ecef;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-btn {
  background: white;
  border: 1px solid #ddd;
  color: #666;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 40px;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #ccc;
}

.page-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.write-modal {
  max-width: 800px;
}

.detail-modal {
  max-width: 700px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #f8f9fa;
}

.detail-title-area {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  color: #333;
  background: #f0f0f0;
}

.modal-body {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.form-row {
  display: flex;
  gap: 20px;
  align-items: end;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.checkbox-group {
  flex: 0 0 auto;
  align-self: center;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  font-family: inherit;
  line-height: 1.5;
  transition: border-color 0.2s ease;
}

.form-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
  color: #495057;
}

.form-checkbox {
  margin-right: 8px;
  width: auto;
  transform: scale(1.1);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
  background: #f8f9fa;
}

.detail-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.detail-meta {
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.meta-row {
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
}

.meta-row:last-child {
  margin-bottom: 0;
}

.meta-label {
  font-weight: 600;
  color: #495057;
  min-width: 80px;
}

.detail-content {
  line-height: 1.7;
  color: #333;
  white-space: pre-wrap;
  font-size: 15px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}
</style>
