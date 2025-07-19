<script setup>
import { ref } from 'vue'
import axios from 'axios'

const students = ref([
  {
    enrollmentId: 1,
    major: '컴퓨터공학과',
    studentId: '20257945',
    name: '유아린',
    attendanceScore: 10,
    midtermScore: 30,
    finalScore: 40,
    totalScore: 80,
    grade: ''
  }
])

const saveGrades = async () => {
    try {
    for (const s of students.value) {
        const payload = {
        enrollmentId: s.enrollmentId,
        score: s.totalScore,
        grade: s.grade
    }
    await axios.put('/api/professor/course/grade', payload)
    }
    alert('성적 저장 완료!')
    } catch (e) {
    console.error(e)
    alert('저장 실패!')
    }
}
</script>

<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4" >성적입력</h2>

        <table class="table-auto w-full border">
            <thead>
                <tr>
                    <th>학과</th>
                    <th>학번</th>
                    <th>이름</th>
                    <th>출석</th>
                    <th>중간</th>
                    <th>기말</th>
                    <th>총점</th>
                    <th>등급</th>
                </tr>
            </thead>
        
        <tbody>
            <tr v-for="s in students" :key="s.enrollmentId">
                <td>{{ s.major }}</td>
                <td>{{ s.studentId }}</td>
                <td>{{ s.name }}</td>
                <td><input type="number" v-model="s.attendanceScore"></td>
                <td><input type="number" v-model="s.midtermScore"></td>
                <td><input type="number" v-model="s.finalScore"></td>
                <td><input type="number" v-model="s.totalScore"></td>
                <td>
                    <select v-model="s.grade">
                        <option value="">선택</option>
                        <option>A+</option>
                        <option>A</option>
                        <option>B+</option>
                        <option>B</option>
                        <option>C+</option>
                        <option>C</option>
                        <option>F</option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" @click="saveGrades"">저장</button>
    </div>
</template>

<style scoped>

</style>